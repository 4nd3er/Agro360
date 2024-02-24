import React from 'react'
import { useState } from 'react'
import '../App.css'

function CardResult({ answer, instructor, questions, totalAnswers }) {
    const [actualQuestion, setActualQuestion] = useState('')

    const answersQuestion = answer.responses.filter((object) => object.question === actualQuestion).map((object) => object.answers).flat()
    return (
        <div className="response w-full mb-8" key={answer.instructor}>

            <div className="text-wrapper-10 inline">{instructor ? `${instructor.names} ${instructor.lastnames}` : "instructor"}</div>
            <select
                className='p-2 rounded-lg border-2 inline absolute right-7 max-w-xs'
                onChange={(e) => setActualQuestion(e.target.value)}>
                <option defaultValue value="">Seleccione la pregunta</option>
                {questions.map((question) => {
                    return (
                        <option key={question} value={question}>{question}</option>
                    )
                })}
            </select>
            <div className="text-wrapper-9">{totalAnswers} respuestas</div>

            <div className='mt-12 mx-10 text-2xl flex flex-col gap-1 overflow-y-scroll answers-height'>
                {answersQuestion.map((answer) => {
                    return (
                        <p className='text-sm'>{answer}</p>
                    )
                })}
            </div>
        </div>
    )
}

export default CardResult