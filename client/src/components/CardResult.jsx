import React from 'react'
import { useState } from 'react'
import '../App.css'

function CardResult({ instructor, results }) {

    const { responses, prom } = results
    const instructorNames = `${instructor.names} ${instructor.lastnames}`

    return (
        <div className="response w-full p-8 flex flex-col gap-6">
            <h1 className=" text-xl text-color-sena">{instructorNames}</h1>
            {/* Tabla */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Pregunta</th>
                            <th scope="col" className="px-6 py-3">Puntaje</th>
                            <th scope="col" className="px-6 py-3">Aprobacion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {responses.map(({ question, points, aprobation }) => {
                            return (
                                <tr className="odd:bg-white even:bg-gray-50 border-b">
                                    <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-md'>{question}</td>
                                    <td className='px-6 py-4 text-center'>{points}</td>
                                    <td className='px-6 py-4 text-center'>{aprobation * 100}%</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CardResult