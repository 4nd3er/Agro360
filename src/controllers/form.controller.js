import { Courses, CoursesNames, Forms, QuestionTypes, Responses, Topics, Users } from "../models/models.js"
import { createMethod, deleteMethod, getMethod, getOneMethod, updateMethod } from "../libs/methods.js"
import { compObjectId, errorResponse, messages } from "../libs/libs.js"
import { capitalizeString, capitalizeWord, compDuplicate } from '../libs/functions.js'
import exceljs from 'exceljs'
import _ from 'lodash'

export const forms = async (req, res) => {
    await getMethod(res, Forms, "Forms")
}

export const getForm = async (req, res) => {
    const { id } = req.params
    await getOneMethod(id, res, Forms, "Form")
}

// Obtener los formularios que han tenido una respuesta
export const getFormsResponse = async (req, res) => {
    try {
        const formsResponse = []
        const forms = await Forms.find({})
        for (const [index, form] of forms.entries()) {
            const id = form._id
            const findResponse = await Responses.findOne({ form: id })
            if (findResponse) formsResponse.push(form)
        }
        res.json(formsResponse)
    } catch (error) {
        errorResponse(res, error)
    }
}

export const createForm = async (req, res) => {
    const { name, description, topic, end, status, questions } = req.body
    let data = { name, description, topic, end, status, creator: req.user.id, questions }
    const find = { name: name, topic: topic }

    try {
        //*Comprobar el id del topic
        const compTopic = await compObjectId(topic, Topics, "Topic")
        if (!compTopic.success) return res.status(compTopic.status).json({ message: [compTopic.msg] })

        //*Comprobar preguntas duplicadas
        const questionNames = questions.map((question) => question.question)
        if (compDuplicate(questionNames)) return res.status(400).json({ message: ["Existen preguntas duplicadas"] })

        // *Validar tipo de pregunta
        for (const [index, { type }] of questions.entries()) {
            const compQuestionType = await compObjectId(type, QuestionTypes, `Question type [${index}]`)
            if (!compQuestionType.success) {
                res.status(compQuestionType.status).json({ message: [compQuestionType.msg] });
                return;
            }
        }

        await createMethod(data, find, res, Forms, "Form")
    } catch (error) {
        errorResponse(res, error)
    }
}

export const updateForm = async (req, res) => {
    const { id } = req.params
    const { name, description, topic, end, status, questions } = req.body
    const data = { name, description, topic, end, status, creator: req.user.id, questions }
    const find = { name: name, topic: topic }

    try {
        //*Comprobar el id del topic
        const compTopic = await compObjectId(topic, Topics, "Topic")
        if (!compTopic.success) return res.status(compTopic.status).json({ message: [compTopic.msg] })

        //*Comprobar preguntas duplicadas
        const questionNames = questions.map((question) => question.question)
        if (compDuplicate(questionNames)) return res.status(400).json({ message: ["Existen preguntas duplicadas"] })

        // *Validar tipo de pregunta
        for (const [index, { type }] of questions.entries()) {
            const compQuestionType = await compObjectId(type, QuestionTypes, `Question type [${index}]`)
            if (!compQuestionType.success) {
                res.status(compQuestionType.status).json({ message: [compQuestionType.msg] });
                return;
            }
        }

        await updateMethod(data, id, find, res, Forms, "La encuesta")
    } catch (error) {
        errorResponse(res, error)
    }
}

export const deleteForm = async (req, res) => {
    const { id } = req.params
    await deleteMethod(id, res, Forms, "Form", async (form) => {
        const findResponses = await Responses.findOne({ form: form._id })
        if (findResponses) {
            res.status(400).json({ message: "La encuesta contiene respuestas" })
            return;
        }
        return true
    })
}

//*
export const getRecentlyForms = async (req, res) => {
    try {
        const findForms = await Forms.find().sort({ createdAt: -1 }).limit(3)
        res.json(findForms)
    } catch (error) {
        errorResponse(res, error)
    }
}

//* Funcion para obtener los resultados de los instructores
async function instructorsResults(responses) {

    let instructorsResults = new Map()

    const instructorIds = Array.from(new Set(
        _.flatMap(responses, (response) => {
            return _.map(response.answers, ({ instructor }) => {
                return instructor.toString()
            })
        })
    ))
    const instructors = await Users.find({ _id: { $in: instructorIds } })

    for (const { answers } of responses) {
        for (const { question, instructor, answer } of answers) {
            const instructorId = instructor.toString()
            const instructorData = _.find(instructors, ({ _id }) => { return _id.toString() == instructorId })
            if (!instructorData) continue;

            let points = 0;
            if (answer.length <= 2) points = parseInt(answer)

            //
            const findInstructor = instructorsResults.get(instructorId)
            if (!findInstructor) {
                instructorsResults.set(instructorId, {
                    instructor: instructorData,
                    responses: [
                        {
                            question: question,
                            answers: [answer],
                            points: points,
                            aprobation: 0,
                        }
                    ],
                    prom: 0,
                    maxPoints: 0,
                    responsesLength: 0
                })
                continue;
            }
            //
            const findQuestion = _.find(findInstructor.responses, (object) => { return object.question == question })
            if (!findQuestion) {
                findInstructor.responses.push({
                    question: question,
                    answers: [answer],
                    points: points,
                })
                continue;
            }
            findQuestion.answers.push(answer)
            findQuestion.points += points
        }
    }
    instructorsResults = [...instructorsResults.values()]

    //Calcular el porcentaje de aprobacion y el porcentaje del promedio
    _.forEach(instructorsResults, (result) => {
        const percents = []
        _.forEach(result.responses, (object) => {
            const calcAprobation = (object.points / (object.answers.length * 5)) * 100
            let aprobation = calcAprobation
            if (calcAprobation.toString().indexOf('.') !== -1) aprobation = parseFloat(calcAprobation.toFixed(2))
            object.aprobation = aprobation
            percents.push(aprobation)
        })
        result.prom = percents.reduce((total, num) => total + num, 0) / percents.length
        result.maxPoints = result.responses[0].answers.length * 5
        result.responsesLength = result.responses[0].answers.length
    })

    //Ordenar por nombre y apellido
    instructorsResults.sort(function (a, b) {
        // Primero ordenar por name
        if (a.instructor.names < b.instructor.names) return -1;
        if (a.instructor.names > b.instructor.names) return 1;

        // Si los names son iguales, ordenar por lastname
        if (a.instructor.lastnames < b.instructor.lastnames) return -1;
        if (a.instructor.lastnames > b.instructor.lastnames) return 1;

        // Si ambos campos son iguales, mantener el orden actual
        return 0;
    });

    return instructorsResults
}

//* Funcion para obtener promedio de instructor por ficha
async function getCourseResults(responses) {
    const coursesResults = new Map()
    const userIds = _.map(responses, function (response) { return response.user })
    const users = await Users.find({ _id: { $in: userIds } }).populate("course")

    for (const { user, answers } of responses) {
        const findUser = _.find(users, function ({ _id }) { return _id.toString() == user.toString() })
        if (!findUser) continue;
        const course = findUser.course
        const courseId = course._id.toString()

        if (!coursesResults.get(courseId)) {
            coursesResults.set(courseId, {
                course: course,
                results: []
            })
        }

        for (const { instructor, answer } of answers) {
            const instructorId = instructor.toString()
            const points = Number(answer)
            const findCourseResult = coursesResults.get(courseId)
            const findInstructor = _.find(findCourseResult.results, function ({ instructor }) { return instructor._id.toString() == instructorId })
            if (!findInstructor) {
                findCourseResult.results.push({
                    instructor: await Users.findById(instructor),
                    points: [points]
                })
                continue;
            }
            findInstructor.points.push(points)
        }
    }

    _.forEach([...coursesResults], ([, { results }]) => {
        _.forEach(results, (result) => {
            const totalPoints = _.reduce(result.points, function (sum, num) { return sum + num }, 0)
            const calcProm = totalPoints / (result.points.length * 5) * 100
            let prom = calcProm;
            if (calcProm.toString().indexOf('.') !== -1) prom = parseFloat(calcProm.toFixed(2))
            result.prom = prom
        })
    })

    return [...coursesResults.values()]
}

export const getTopInstructorsResults = (instructorsResults) => {

    //Obtener las preguntas
    const questionsAprobations = _.map(instructorsResults[0].responses, ({ question }) => {
        return {
            question,
            topBest: [],
            topWorst: [],
            aprobations: []
        }
    })

    //Por cada respuesta, guardar las respuesta del instructor segun la pregunta
    _.forEach(instructorsResults, ({ instructor, responses, responsesLength }) => {
        _.forEach(responses, ({ question, aprobation }) => {
            const findQuestion = _.find(questionsAprobations, { question })
            if (responsesLength >= 10) {
                findQuestion.aprobations.push({
                    instructor,
                    aprobation
                })
            }
        })
    })

    //Sacar los tops y solo tomar los 10 mejores y peores
    _.forEach(questionsAprobations, (question) => {
        const topBest = _.orderBy(question.aprobations, ['aprobation'], ['desc']).slice(0, 5)
        const topWorst = _.orderBy(question.aprobations, ['aprobation'], ['asc']).slice(0, 5)
        question.topBest = topBest
        question.topWorst = topWorst
    })

    return questionsAprobations
}

//* Generar los resultados del instructor segun las respuestas
export const getInstructorsResults = async (req, res) => {
    const { id } = req.params

    try {
        const findForm = await Forms.findOne({ _id: id })
        if (!findForm) return res.status(404).json({ message: [messages.notFound("Form")] })
        const findResponses = await Responses.find({ form: id }).lean()
        const results = await instructorsResults(findResponses)
        const tops = getTopInstructorsResults(results)

        res.json({
            response: "Instructor results created succesfully",
            data: {
                results,
                responsesLength: findResponses.length,
                tops
            }
        })
    } catch (error) {
        errorResponse(res, error)
    }
}

//* Reporte en excel de resultados
export const getFormReport = async (req, res) => {
    const { id } = req.params

    try {
        const findForm = await Forms.findById(id)
        if (!findForm) return res.status(404).json({ message: [messages.notFound("Form")] })
        const questions = _.map(findForm.questions, 'question')
        const questionsLength = findForm.questions.length
        const findResponses = await Responses.find({ form: id })
        if (!findResponses) return res.status(404).json({ message: [messages.notFound("Responses")] })

        //Data
        const responses = await instructorsResults(findResponses)
        const courseProm = await getCourseResults(findResponses)
        const tops = getTopInstructorsResults(responses)

        //*XLSX - Reporte General
        const workbook = new exceljs.Workbook();

        //*TOPS
        const topsSheet = workbook.addWorksheet("TOPS")

        //Header tops
        const topsHeader = topsSheet.getRow(1).getCell(1)
        topsSheet.mergeCells(1, 1, 1, questionsLength * 2)
        topsHeader.value = `TOPS`
        topsHeader.font = { size: 20, bold: true, color: { argb: '000000' } }
        topsHeader.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '92D050' }
        }

        //Header questions
        const questionsRow = topsSheet.getRow(2)
        questionsRow.height = 30
        _.forEach(questions, (question, index) => {
            const cellIndex = index * 2 + 1

            //Question
            const questionCell = questionsRow.getCell(cellIndex)
            questionCell.value = question
            questionCell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'C4D79B' }
            };
            questionCell.font = { size: 10 }
            topsSheet.mergeCells(2, cellIndex, 2, cellIndex + 1)

            //Best
            const bestTopHeader = topsSheet.getRow(3).getCell(cellIndex)
            bestTopHeader.value = `Mejor`
            bestTopHeader.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '92D050' }
            };

            //Worst
            const worstTopHeader = topsSheet.getRow(3).getCell(cellIndex + 1)
            worstTopHeader.value = `Por mejorar`
            worstTopHeader.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'C0504D' }
            };
        })

        //Data

        _.forEach(tops, ({ question, topBest, topWorst }, index) => {
            const actualColumn = index * 2 + 1
            const actualRow = 4

            const actualQuestion = topsSheet.getRow(actualRow - 2).getCell(actualColumn).value
            const top = _.find(tops, { question: actualQuestion })

            _.forEach(top.topBest, ({ instructor, aprobation }, index) => {
                const topBestCell = topsSheet.getRow(actualRow + index).getCell(actualColumn)
                const instructorTop = `${instructor.names} ${instructor.lastnames}: ${aprobation}%`
                topBestCell.value = instructorTop
                topBestCell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'EBF1DE' }
                }
            })
            
            _.forEach(top.topWorst, ({ instructor, aprobation }, index) => {
                const topWorstCell = topsSheet.getRow(actualRow + index).getCell(actualColumn + 1)
                const instructorTop = `${instructor.names} ${instructor.lastnames}: ${aprobation}%`
                topWorstCell.value = instructorTop
                topWorstCell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'F2DCDB' }
                }
            })        
        })

        //Tamaño de cada columna
        for (let i = 1; i <= questionsLength * 2; i++) {
            const column = topsSheet.getColumn(i)
            column.width = 40
            column.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        }

        // Alto de cada fila
        const lastRow = topsSheet.lastRow.number
        for (let i = 4; i <= lastRow; i++) {
            const row = topsSheet.getRow(i)
            row.height = 30
        }

        // Aplicar bordes a todas las celdas
        topsSheet.eachRow({ includeEmpty: false }, function (row) {
            row.eachCell({ includeEmpty: false }, function (cell) {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
            });
        });

        //Para cada instructor
        for (const response of responses) {
            const instructorId = response.instructor._id.toString()
            const instructor = await Users.findById(instructorId)
            const instructorNames = `${instructor.names} ${instructor.lastnames}`

            const sheet = workbook.addWorksheet(instructorNames) //Crear hoja

            //*Inicio de hoja

            //*Header
            sheet.mergeCells('A1:D1'); //Combinar celdas de primera fila
            const headerRow = sheet.getRow(1).getCell(1) // Primera fila & celda
            headerRow.value = `Reporte de Resultados - ${instructorNames}`;
            headerRow.font = { size: 16, bold: true, color: { argb: '000000' } }; // Fuente
            headerRow.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'F79646' }
            }; // Fondo

            //*Columns
            const columnsRow = sheet.addRow(["Pregunta", "Puntaje", "Puntaje Maximo", "Aprobacion"]);
            columnsRow.eachCell({ includeEmpty: true }, function (cell) {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: '92D050' }
                }; // Fondo
                cell.alignment = { vertical: 'middle', horizontal: 'center' } //Alineacion
                cell.font = { bold: true } //Fuente
            });

            //*Data
            response.responses.forEach(object => {
                const row = sheet.addRow([object.question, object.points, response.maxPoints, object.aprobation / 100]) // Añadir fila con datos
                row.getCell(4).numFmt = object.aprobation % 1 !== 0 ? '0.00%' : '0%' //Tipo porcentaje
            })

            //*Total Responses
            //Header
            const headerTotalResponsesRow = sheet.lastRow.number + 3
            const headerTotalResponsesCell = sheet.getCell(`B${headerTotalResponsesRow}`)
            const headerStyle = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '92D050' }
            }
            sheet.mergeCells(`B${headerTotalResponsesRow}:D${headerTotalResponsesRow}`)
            headerTotalResponsesCell.value = "Total respuestas" //header
            headerTotalResponsesCell.fill = headerStyle // Fondo
            headerTotalResponsesCell.font = { bold: true } // Fuente

            //Data
            const totalResponsesRow = headerTotalResponsesRow + 1
            const totalResponsesCell = sheet.getCell(`B${totalResponsesRow}`) // Celda de promedio
            sheet.mergeCells(`B${totalResponsesRow}:D${totalResponsesRow}`) // Combinar celdas
            totalResponsesCell.value = response.responsesLength //Valor

            //*Prom
            //Header
            const headerPromRow = headerTotalResponsesRow
            const headerPromCell = sheet.getCell(`F${headerPromRow}`)
            sheet.mergeCells(`F${headerPromRow}:G${headerPromRow}`)
            headerPromCell.value = "Promedio General" //header
            headerPromCell.fill = headerStyle // Fondo
            headerPromCell.font = { bold: true } // Fuente

            //Data
            const promRow = headerPromRow + 1
            const promCell = sheet.getCell(`F${promRow}`) // Celda de promedio
            sheet.mergeCells(`F${promRow}:G${promRow}`) // Combinar celdas
            promCell.value = response.prom / 100 //Valor
            promCell.numFmt = response.prom % 1 !== 0 ? '0.00%' : '0%' //Tipo porcentaje


            //*Promedio por ficha
            //Header   
            const headerCoursePromRow = promRow + 2
            const headerCourseProm = sheet.getCell(`F${headerCoursePromRow}`)
            sheet.mergeCells(`F${headerCoursePromRow}:G${headerCoursePromRow}`)
            headerCourseProm.value = "Promedio por ficha"
            headerCourseProm.fill = headerStyle
            headerCourseProm.font = { bold: true }

            //Columns
            const CoursePromColumnsRow = headerCoursePromRow + 1
            const CoursePromColumnsCellStyle = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'C4D79B' }
            }
            const CoursePromColumnsCell = sheet.getCell(`F${CoursePromColumnsRow}`)
            const CoursePromColumnsCell2 = sheet.getCell(`G${CoursePromColumnsRow}`)

            CoursePromColumnsCell.fill = CoursePromColumnsCellStyle
            CoursePromColumnsCell2.fill = CoursePromColumnsCellStyle
            CoursePromColumnsCell.value = "Ficha"
            CoursePromColumnsCell2.value = "Promedio"

            //Data
            let actualCell = 0
            const CoursePromLastRow = sheet.lastRow.number + 1
            for (const { course, results } of courseProm) {
                const cellE = sheet.getCell(`F${CoursePromLastRow + actualCell}`)
                const cellF = sheet.getCell(`G${CoursePromLastRow + actualCell}`)
                const findInstructor = _.find(results, ({ instructor: courseInstructor }) => { return courseInstructor._id.toString() == instructorId })
                if (!findInstructor) continue;
                cellE.value = Number(course.number)
                cellF.numFmt = findInstructor.prom % 1 !== 0 ? '0.00%' : '0%'
                cellF.value = findInstructor.prom / 100
                actualCell += 1
            }

            //Ancho y alineacion de columnas
            sheet.getColumn(1).width = 100

            for (let i = 2; i <= 7; i++) {
                const column = sheet.getColumn(i)
                column.width = 17
                if (i == 5) column.width = 10
                column.alignment = { vertical: 'middle', horizontal: 'center' };
            }

            // Aplicar bordes a todas las celdas
            sheet.eachRow({ includeEmpty: false }, function (row) {
                row.eachCell({ includeEmpty: false }, function (cell) {
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };
                });
            });
        }

        const file = `Reporte de resultados Encuesta: ${id}.xlsx`;

        //Crear el archivo
        const stream = await workbook.xlsx.writeBuffer();
        // Enviar el archivo como respuesta a la solicitud GET
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=${file}`);
        res.end(stream)
    } catch (error) {
        errorResponse(res, error)
    }
}

// *Question Types
export const questionTypes = async (req, res) => {
    await getMethod(res, QuestionTypes, "Question types")
}

export const getQuestionType = async (req, res) => {
    const { id } = req.params
    await getOneMethod(id, res, QuestionTypes, "Question type")
}

export const createQuestionType = async (req, res) => {
    const { name } = req.body
    const data = { name, creator: req.user.id }
    const find = { name: name }
    await createMethod(data, find, res, QuestionTypes, "Question type")
}

export const updateQuestionType = async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const data = { name, creator: req.user.id }
    const find = { name: name }
    await updateMethod(data, id, find, res, QuestionTypes, "Question Type")
}

export const deleteQuestionType = async (req, res) => {
    const { id } = req.params
    await deleteMethod(id, res, QuestionTypes, "Question type")
}