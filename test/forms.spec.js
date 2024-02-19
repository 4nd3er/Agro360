import { Users, Forms, Responses } from '../src/models/models.js'
import _ from 'lodash'

function getRandom(min, max) {
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    return number.toString()
}

async function formsTesting(user, form, instructors, cant) {

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

export default formsTesting