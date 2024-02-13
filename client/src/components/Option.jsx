import React, { useEffect, useRef, useState } from 'react'

function Option({ dataQuestion, dataInstructor, setValid, actualIndex }) {
    const [value, setValue] = useState('') //Valor de la respuesta

    const question = dataQuestion.question
    const type = dataQuestion.type
    const options = dataQuestion.options
    const instructor = dataInstructor.document

    const compValue = () =>{
        const responses = JSON.parse(localStorage.getItem('responses'))
        const getInstructor = responses.find(response => response.instructor === instructor)
        const getQuestion = getInstructor.answers.find(answer => answer.question === question)
        return getQuestion.value
    }

    //Al cargar el componente, se verifica si hay una respuesta guardada en el localStorage
    useEffect(() => {
        setValue(compValue())
    }, [instructor])

    //Al cambiar de respuesta, se guarda en el localStorage
    const handleChange = (value) => {
        const responses = JSON.parse(localStorage.getItem('responses'))
        responses.find(response => response.instructor === instructor).answers.find(answer => answer.question === question).value = value
        localStorage.setItem('responses', JSON.stringify(responses))
        setValue(value);
        if (!value || value === '') return setValid(false)
        setValid(true)
    };

    return (
        <>
            {/* Respuesta abierta */}
            {type == '654058b803a2be5f286df7b8' && (
                <div className='flex items-center w-full'>
                    <textarea
                        type="text"
                        placeholder='Campo para respuesta abierta'
                        className="border-2 p-2 border-gray-400 resize-none rounded-lg w-full mb-3"
                        onChange={(e) => handleChange(e.target.value)}
                        defaultValue={openres}
                    ></textarea>
                </div>
            )}
            {/* Seleccion Unica */}
            {type == '6540651189e8593b88d3848e' && options && (
                <div className='flex flex-row gap-5 items-center justify-center'>
                    {options.map((option, index) => {
                        return (
                            <div key={option._id} className="flex flex-col gap-1 items-center justify-center">
                                <input id={option._id} name={`option${instructor}`} value={option.option} defaultChecked={radio === option.option} onClick={(e) => handleChange(e.target.value)} type="radio" className="w-5 h-5 text-blue-600  ring-offset-gray-800 bg-gray-700 border-gray-600" />
                                <label htmlFor={option._id}>
                                    {option.option}
                                </label>
                            </div>
                        )
                    })}
                </div>
            )}

            {/* Seleccion Multiple */}
            {type == '6556dd95fe823a88d48fafc3' && (
                <div className='flex flex-row gap-5 items-center'>
                    {options.map((option) => {
                        return (
                            <div key={option._id} className="flex flex-col gap-1 items-center justify-center">
                                <input id={option._id} value={option.option} 
                                //checked={checkbox.find(checkbox => checkbox === option.option)} 
                                onChange={(e) => handleChange([...value, e.target.value])} type="checkbox" className="w-5 h-5 text-blue-600 focus:ring-blue-500 ring-offset-gray-800 bg-gray-700 border-gray-600" />
                                <label htmlFor={option._id}>
                                    {option.option}
                                </label>
                            </div>
                        )
                    })}
                </div>
            )}
            {/* Escala de value */}
            {type == '6556ddbbfe823a88d48fafc4' && (
                <div className='py-4 overflow-auto max-w-max'>
                    <ul className="flex gap-16 mb-4">
                        <li className='flex flex-col text-center' onClick={() => handleChange('1')}>
                            <input disabled type="radio" id="opcion1" name="escala" value="1" className="hidden peer" />
                            <label
                                htmlFor="opcion1"
                                className={`${compValue() === '1' ? '!bg-gray-400' : ''} px-5 py-4 text-gray-800 bg-white border-2 border-gray-500 rounded-lg cursor-pointer peer-checked:bg-gray-300 transition-all ${value != '1' ? 'hover:bg-gray-100 hover:text-gray-600' : ''} text-3xl select-none`}
                            >
                                1
                            </label>
                            <label className="text-xs mt-1">
                                Nunca
                            </label>
                        </li>
                        <li className="flex flex-col text-center" onClick={() => handleChange('2')}>
                            <input disabled type="radio" id="opcion2" name="escala" value="2" className="hidden peer" />
                            <label
                                htmlFor="opcion2"
                                className={`${compValue() == '2' ? '!bg-gray-400' : ''} px-5 py-4 text-gray-800 bg-white border-2 border-gray-500 rounded-lg cursor-pointer peer-checked:bg-gray-300 transition-all ${value != '2' ? 'hover:bg-gray-100 hover:text-gray-600' : ''} text-3xl select-none`}
                            >
                                2
                            </label>
                            <label className="text-xs mt-1">
                                Casi nunca
                            </label>
                        </li>
                        <li className="flex flex-col text-center" onClick={() => handleChange('3')}>
                            <input disabled type="radio" id="opcion3" name="escala" value="3" className="hidden peer" />
                            <label
                                htmlFor="opcion3"
                                className={`${compValue() == '3' ? '!bg-gray-400' : ''} px-5 py-4 text-gray-800 bg-white border-2 border-gray-500 rounded-lg cursor-pointer peer-checked:bg-gray-300 transition-all ${value != '3' ? 'hover:bg-gray-100 hover:text-gray-600' : ''} text-3xl select-none`}
                            >
                                3
                            </label>
                            <label className="text-xs mt-1">
                                A veces
                            </label>
                        </li>
                        <li className="flex flex-col text-center" onClick={() => handleChange('4')}>
                            <input disabled type="radio" id="opcion4" name="escala" value="4" className="hidden peer" />
                            <label
                                htmlFor="opcion4"
                                className={`${compValue() == '4' ? '!bg-gray-400' : ''} px-5 py-4 text-gray-800 bg-white border-2 border-gray-500 rounded-lg cursor-pointer peer-checked:bg-gray-300 transition-all ${value != '4' ? 'hover:bg-gray-100 hover:text-gray-600' : ''} text-3xl select-none`}
                            >
                                4
                            </label>
                            <label className="text-xs mt-1">
                                Casi siempre
                            </label>
                        </li>
                        <li className="flex flex-col text-center" onClick={() => handleChange('5')}>
                            <input disabled type="radio" id="opcion5" name="escala" value="5" className="hidden peer" />
                            <label
                                htmlFor="opcion5"
                                className={`${compValue() == '5' ? '!bg-gray-400' : ''} px-5 py-4 text-gray-800 bg-white border-2 border-gray-500 rounded-lg cursor-pointer peer-checked:bg-gray-300 transition-all ${value != '5' ? 'hover:bg-gray-100 hover:text-gray-600' : ''} text-3xl select-none`}
                            >
                                5
                            </label>
                            <label className="text-xs mt-1">
                                Siempre
                            </label>
                        </li>
                    </ul>
                </div>
            )}
            {/* Escala de Puntuación */}
            {type == '6556de54fe823a88d48fafc5' && (
                <ul className="flex justify-center gap-10 mb-4">
                    {scalePoints.map((point) => {
                        <li onClick={setPointScale(point)}>
                            <input disabled type="hidden" id={`option${point}`} name={`option${point}`} className="peer" />
                            <label
                                htmlFor={`option${point}`}
                                className="px-4 py-3 text-gray-800 bg-white border-2 border-gray-500 rounded-lg cursor-pointer peer-checked:bg-gray-300 hover:text-gray-600 hover:bg-gray-100 text-2xl select-none">
                                {point}
                            </label>
                        </li>
                    })}
                </ul>

            )}
        </>
    )
}

export default Option