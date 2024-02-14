import { Forms, QuestionTypes, Responses, Topics, Users } from "../models/models.js"
import { createMethod, deleteMethod, getMethod, getOneMethod, updateMethod } from "../libs/methods.js"
import { compObjectId, errorResponse, messages } from "../libs/libs.js"
import { capitalizeString, capitalizeWord, compDuplicate } from '../libs/functions.js'
import exceljs from 'exceljs'

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

        await updateMethod(data, id, find, res, Forms, "Form")
    } catch (error) {
        errorResponse(res, error)
    }
}

export const deleteForm = async (req, res) => {
    const { id } = req.params
    await deleteMethod(id, res, Forms, "Form")
}

//* Funcion para obtener los resultados de los instructores
function instructorsResults(responses) {
    const instructorsResults = []
    for (const { answers } of responses) {
        for (const { question, instructor: instructorId, answer } of answers) {
            let points = 0;
            if (answer.length <= 2) points = parseInt(answer)
            const instructor = instructorId.toString()

            //
            const findInstructor = instructorsResults.find(object => object.instructor === instructor)
            if (!findInstructor) {
                instructorsResults.push({
                    instructor: instructor,
                    responses: [
                        {
                            question: question,
                            answers: [answer],
                            points: points,
                        }
                    ],
                    prom: 0,
                })
                continue;
            }
            //
            const findQuestion = findInstructor.responses.find(object => object.question === question)
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

    //Calcular el porcentaje de aprobacion y el porcentaje del promedio
    for (const result of instructorsResults) {
        const percents = []
        for (const object of result.responses) {
            const calcAprobation = (object.points / (object.answers.length * 5)) * 100
            let aprobation = calcAprobation
            if (calcAprobation.toString().indexOf('.') !== -1) {
                aprobation = parseFloat(calcAprobation.toFixed(2))
            }
            object.aprobation = aprobation
            percents.push(aprobation)
        }
        result.prom = percents.reduce((total, num) => total + num, 0) / percents.length
    }

    return instructorsResults
}

//* Generar los resultados del instructor segun las respuestas
export const getInstructorsResults = async (req, res) => {
    const { id } = req.params

    try {
        const findForm = await Forms.findById(id)
        const findResponses = await Responses.find({ form: id })
        if (!findForm) return res.status(404).json({ message: [messages.notFound("Form")] })
        const results = instructorsResults(findResponses)

        res.json(results)
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
        const findResponses = await Responses.find({ form: id })
        if (!findResponses) return res.status(404).json({ message: [messages.notFound("Responses")] })

        const responses = instructorsResults(findResponses)

        //*XLSX

        //Libro
        const workbook = new exceljs.Workbook();

        //Hoja de calculo
        for (const response of responses) {
            const questions = response.responses.map(object => object.question)
            const instructor = await Users.findById(response.instructor)
            const instructorNames = `${instructor.names} ${instructor.lastnames}`

            //Crear Hoja
            const sheet = workbook.addWorksheet(instructorNames)
            // Combinar celdas para el texto grande en la primera fila
            sheet.mergeCells('A1:C1');
            const titleRow = sheet.getRow(1);
            titleRow.getCell(1).value = `Reporte de Resultados - ${instructorNames}`;
            titleRow.getCell(1).font = { size: 16, bold: true, color: { argb: '000000' } }; // Tamaño grande y negrita
            titleRow.getCell(1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'F79646' } // Fondo azul
            };
            // Añadir encabezados con fondo de color
            const headerRow = sheet.addRow(["Pregunta", "Puntaje", "Aprobacion"]);
            headerRow.eachCell({ includeEmpty: true }, function (cell) {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: '92D050' } // Color de fondo amarillo
                };
                cell.alignment = { vertical: 'middle', horizontal: 'center' }
                cell.font = { bold: true }
            });
            //Datos json a excel
            response.responses.forEach(object => {
                const row = sheet.addRow([object.question, object.points, object.aprobation / 100])
                row.getCell(3).numFmt = object.aprobation % 1 !== 0 ? '0.00%' : '0%'
            })
            //Ultima fila
            const lastRow = sheet.lastRow
            const rowIndexToInsert = lastRow.number + 2;
            sheet.mergeCells(`B${rowIndexToInsert}:C${rowIndexToInsert}`)
            sheet.getCell(`B${rowIndexToInsert}`).value = "Promedio"
            sheet.getCell(`B${rowIndexToInsert}`).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '92D050' }
            }
            sheet.getCell(`B${rowIndexToInsert}`).alignment = { vertical: 'middle', horizontal: 'center' }
            sheet.getCell(`B${rowIndexToInsert}`).font = { bold: true }
            sheet.mergeCells(`B${rowIndexToInsert + 1}:C${rowIndexToInsert + 1}`)
            sheet.getCell(`B${rowIndexToInsert + 1}`).value = response.prom / 100
            sheet.getCell(`B${rowIndexToInsert + 1}`).numFmt = response.prom % 1 !== 0 ? '0.00%' : '0%'

            // Centrar las celdas en las columnas B y C
            sheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
                row.getCell(2).alignment = { vertical: 'middle', horizontal: 'center' }; // Columna B
                row.getCell(3).alignment = { vertical: 'middle', horizontal: 'center' }; // Columna C
            });
            //Ancho de columnas
            sheet.getColumn(1).width = 100
            sheet.getColumn(2).width = 14
            sheet.getColumn(3).width = 14
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