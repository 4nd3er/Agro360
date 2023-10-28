import React from 'react'

const Options = ({ option, index, questionType, handleOptionChange, deleteOption }) => {
    return (
        <>
            {questionType === '1' && (
                <div className='px-10'>
                    <div className='flex items-center'>
                        <input disabled id={index + 1} type="radio" name="default-radio" className="w-5 h-5 text-blue-600 focus:ring-blue-500 ring-offset-gray-800 bg-gray-700 border-gray-600" />
                        <input
                            id={index + 1}
                            key={index}
                            type="text"
                            htmlFor={index + 1}
                            placeholder={`Opción ${index + 1}`}
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            className="ml-2 text-lg font-medium text-gray-900 focus:border-b-2 p-2 border-gray-400"
                        />
                        <button
                            onClick={() => deleteOption(option)}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            )}
            {questionType === '2' && (
                <div className='px-10'>
                    <div className='flex items-center'>
                        <input disabled id={option + index} type="checkbox" className=" rounded w-5 h-5 text-blue-600 focus:ring-blue-500 ring-offset-gray-800 bg-gray-700 border-gray-600" />
                        <input
                            id={index + 1}
                            key={index}
                            type="text"
                            htmlFor={option + index}
                            placeholder={`Opción ${index + 1}`}
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            className="ml-2 text-lg font-medium text-gray-900 focus:border-b-2 p-2 border-gray-400"
                        />
                        <button
                            onClick={() => deleteOption(option)}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            )}
            {questionType === '3' && (
                <div className='px-10 py-4'>
                    <div className='flex justify-around'>
                        <h3 className="mb-5 text-lg font-medium text-gray-900">No satifactorio</h3>
                        <h3 className="mb-5 text-lg font-medium text-gray-900">Muy satifactorio</h3>
                    </div>
                    <ul className="flex justify-center gap-10">
                        <li>
                            <input type="radio" id="opcion1" name="escala" value="1" className="hidden peer" />
                            <label
                                htmlFor="opcion1"
                                className="px-5 py-4 text-gray-800 bg-white border-2 border-gray-500 rounded-lg cursor-pointer peer-checked:bg-gray-300 hover:text-gray-600 hover:bg-gray-100 text-3xl"
                            >
                                1
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="opcion2" name="escala" value="2" className="hidden peer" />
                            <label
                                htmlFor="opcion2"
                                className="px-5 py-4 text-gray-800 bg-white border-2 border-gray-500 rounded-lg cursor-pointer peer-checked:bg-gray-300 hover:text-gray-600 hover:bg-gray-100 text-3xl"
                            >
                                2
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="opcion3" name="escala" value="3" className="hidden peer" />
                            <label
                                htmlFor="opcion3"
                                className="px-5 py-4 text-gray-800 bg-white border-2 border-gray-500 rounded-lg cursor-pointer peer-checked:bg-gray-300 hover:text-gray-600 hover:bg-gray-100 text-3xl"
                            >
                                3
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="opcion4" name="escala" value="4" className="hidden peer" />
                            <label
                                htmlFor="opcion4"
                                className="px-5 py-4 text-gray-800 bg-white border-2 border-gray-500 rounded-lg cursor-pointer peer-checked:bg-gray-300 hover:text-gray-600 hover:bg-gray-100 text-3xl"
                            >
                                4
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="opcion5" name="escala" value="5" className="hidden peer" />
                            <label
                                htmlFor="opcion5"
                                className="px-5 py-4 text-gray-800 bg-white border-2 border-gray-500 rounded-lg cursor-pointer peer-checked:bg-gray-300 hover:text-gray-600 hover:bg-gray-100 text-3xl"
                            >
                                5
                            </label>
                        </li>
                    </ul>
                </div>
            )}
        </>
    )
}

export default Options