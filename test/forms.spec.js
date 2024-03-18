import { Users, Forms, Responses, Courses, CoursesCronogram, CoursesNames } from '../src/models/models.js'
import _ from 'lodash'

function getRandom(min, max) {
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    return number.toString()
}

export async function formsTesting(cant) {

    const user = "65cf80ec6e33b39a288dcad9"
    const form = "657b99f6d1e75f854c2e3d3a"
    const instructors = ["656c4ea5ac32b3aab8b2d295", "656c1fbd8aaa1a0c8605988d", "656c1fb98aaa1a0c86059821", "656c1fbe8aaa1a0c860598a2",
        "657b96d7a5531a7353610e88", "656c1fbb8aaa1a0c8605984e", "656c1fbd8aaa1a0c86059896", "657b96d7a5531a7353610e89", "657b96d7a5531a7353610e8a",
        "657b96d7a5531a7353610e8b", "657b96d7a5531a7353610e8c", "656c1fb78aaa1a0c860597e8", "656c1fb78aaa1a0c860597e5", "657b96d7a5531a7353610e8d",
        "657b96d7a5531a7353610e8e", "657b96d7a5531a7353610e8f"]

    const getData = async () => {
        const findForm = await Forms.findById(form)
        const questions = _.flatMap(findForm, ({ questions }) => { return _.map(questions, ({ question }) => { return question }) })
        return questions
    }

    const questions = await getData()

    const responses = []
    for (let i = 1; i <= cant; i++) {
        const data = {
            user,
            form,
            answers: []
        }
        _.forEach(instructors, (instructor) => {
            _.forEach(questions, (question) => {
                data.answers.push({
                    question,
                    instructor,
                    answer: getRandom(1, 5)
                })
            })
        })
        responses.push(data)
    }

    await Responses.insertMany(responses)
    return responses
}

export async function cronogramsTesting(instructorsNumber) {
    //CourseName
    const courseName = "testCourse"
    await CoursesNames.findOneAndDelete({ name: courseName })
    const newCourseName = new CoursesNames({ name: courseName })
    await newCourseName.save()

    //Course
    const oldCourse = await Courses.findOneAndDelete({ number: "000000" })
    const newCourse = new Courses({ name: newCourseName._id, type: "Test", number: "000000" })
    await newCourse.save()

    //Course Cronogram
    await CoursesCronogram.findOneAndDelete({ course: oldCourse._id })
    const instructors = await Users.find({ rol: "655b1f6df9b6aad257662a58" }).limit(instructorsNumber).select("_id")
    const newCronogram = new CoursesCronogram({ course: newCourse._id, instructors: instructors.map(({ _id }) => { return _id }) })
    console.log(newCronogram)
    await newCronogram.save()

    await Users.findOneAndUpdate({ document: "1089478347" }, { course: newCourse._id })
}