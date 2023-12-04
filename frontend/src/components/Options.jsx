const Options = ({ option, index, questionIndex, question, handleOptionChange, deleteOption, questionTypeValue, validationQuestionOption }) => {
    return (
        <>
            {questionTypeValue[question[1][1]] == 'Respuesta Abierta' && (
                <div className='flex items-center'>
                    <textarea
                        id={index + 1}
                        key={index}
                        type="text"
                        htmlFor={index + 1}
                        placeholder='Campo para respuesta abierta'
                        onChange={(e) => handleOptionChange(questionIndex, index, e.target.value)}
                        className="border-2 p-2 border-gray-400 resize-none rounded-lg w-full mb-3"
                        disabled
                    />
                </div>
            )}
            {questionTypeValue[question[1][1]] == 'Selección Única' && (
                <div className='flex items-center'>
                    <input disabled type="radio" name="default-radio" className="w-5 h-5 text-blue-600 focus:ring-blue-500 ring-offset-gray-800 bg-gray-700 border-gray-600" />
                    <input
                        id={index + 1}
                        key={index}
                        type="text"
                        htmlFor={index + 1}
                        placeholder={`Opción ${index + 1}`}
                        value={option}
                        onChange={(e) => handleOptionChange(questionIndex, index, e.target.value)}
                        className="ml-2 text-lg font-medium text-gray-900 focus:border-b-2 p-2 border-gray-400"
                    />
                    {question[2].length > 1 && (
                        <div
                            className='font-bold hover:bg-gray-100 p-2 text-xs rounded-md transition-all cursor-pointer'
                            onClick={() => deleteOption(index, questionIndex)}
                        >
                            Eliminar opción
                        </div>
                    )}
                    <div className='px-10 text-red-500 flex justify-around select-none'>
                        <span className={`${option === '' && validationQuestionOption ? 'opacity-100' : 'opacity-0'} transition-[.1s_all] text-xs`}>Las opción no debe ser vacia</span>
                    </div>
                </div>
            )}
            {questionTypeValue[question[1][1]] == 'Selección Múltiple' && (
                <div className='flex items-center'>
                    <div className=''>
                        <input disabled type="checkbox" className=" rounded w-5 h-5 text-blue-600 focus:ring-blue-500 ring-offset-gray-800 bg-gray-700 border-gray-600" />
                        <input
                            id={index + 1}
                            key={index}
                            type="text"
                            htmlFor={option + index}
                            placeholder={`Opción ${index + 1}`}
                            value={option}
                            onChange={(e) => handleOptionChange(questionIndex, index, e.target.value)}
                            className="ml-2 text-lg font-medium text-gray-900 focus:border-b-2 p-2 border-gray-400"
                        />
                    </div>
                    {question[2].length > 1 && (
                        <div
                            className='font-bold hover:bg-gray-100 p-2 text-xs rounded-md transition-all cursor-pointer'
                            onClick={() => deleteOption(index, questionIndex)}
                        >
                            Eliminar opción
                        </div>
                    )}
                    <div className='px-10 text-red-500 flex justify-around select-none'>
                        <span className={`${option === '' && validationQuestionOption ? 'opacity-100' : 'opacity-0'} transition-[.1s_all] text-xs`}>Las opción no debe ser vacia</span>
                    </div>
                </div>
            )}
            {questionTypeValue[question[1][1]] == 'Escala de Likert' && (
                <div className='py-4'>
                    {/* <div className='flex justify-around'>
                        {option.map((content, indexContent) => (
                            <>
                                <input
                                    type="text"
                                    value={content}
                                    placeholder={`parametro ${indexContent + 1}`}
                                    className="mb-6 text-lg font-medium text-gray-900 rounded"
                                    onChange={(e) => handleOptionChange(questionIndex, index, e.target.value, indexContent)}
                                />
                                <div className='px-10 text-red-500 flex justify-around select-none'>
                                    <span className={`${content === '' && validationQuestionOption ? 'opacity-100' : 'opacity-0'} transition-[.1s_all] text-xs`}>Las opción no debe ser vacia</span>
                                </div>
                            </>
                        ))}
                    </div> */}
                    <ul className="flex justify-center gap-16 mb-4">
                        <li className="flex flex-col text-center">
                            <input disabled type="radio" id="opcion1" name="escala" value="1" className="hidden peer" />
                            <label
                                htmlFor="opcion1"
                                className="px-5 py-4 text-gray-800 bg-white border-2 border-gray-500 rounded-lg cursor-pointer peer-checked:bg-gray-300 hover:text-gray-600 hover:bg-gray-100 text-3xl select-none"
                            >
                                1
                            </label>
                            <label className="text-xs mt-1">
                                Nunca
                            </label>
                        </li>
                        <li className="flex flex-col text-center">
                            <input disabled type="radio" id="opcion2" name="escala" value="2" className="hidden peer" />
                            <label
                                htmlFor="opcion2"
                                className="px-5 py-4 text-gray-800 bg-white border-2 border-gray-500 rounded-lg cursor-pointer peer-checked:bg-gray-300 hover:text-gray-600 hover:bg-gray-100 text-3xl select-none"
                            >
                                2
                            </label>
                            <label className="text-xs mt-1">
                                Casi nunca
                            </label>
                        </li>
                        <li className="flex flex-col text-center">
                            <input disabled type="radio" id="opcion3" name="escala" value="3" className="hidden peer" />
                            <label
                                htmlFor="opcion3"
                                className="px-5 py-4 text-gray-800 bg-white border-2 border-gray-500 rounded-lg cursor-pointer peer-checked:bg-gray-300 hover:text-gray-600 hover:bg-gray-100 text-3xl select-none"
                            >
                                3
                            </label>
                            <label className="text-xs mt-1">
                                A veces
                            </label>
                        </li>
                        <li className="flex flex-col text-center">
                            <input disabled type="radio" id="opcion4" name="escala" value="4" className="hidden peer" />
                            <label
                                htmlFor="opcion4"
                                className="px-5 py-4 text-gray-800 bg-white border-2 border-gray-500 rounded-lg cursor-pointer peer-checked:bg-gray-300 hover:text-gray-600 hover:bg-gray-100 text-3xl select-none"
                            >
                                4
                            </label>
                            <label className="text-xs mt-1">
                                Casi siempre
                            </label>
                        </li>
                        <li className="flex flex-col text-center">
                            <input disabled type="radio" id="opcion5" name="escala" value="5" className="hidden peer" />
                            <label
                                htmlFor="opcion5"
                                className="px-5 py-4 text-gray-800 bg-white border-2 border-gray-500 rounded-lg cursor-pointer peer-checked:bg-gray-300 hover:text-gray-600 hover:bg-gray-100 text-3xl select-none"
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
            {questionTypeValue[question[1][1]] == 'Escala de Puntuación' && (
                <div className='py-4'>
                    {/* <div className='flex justify-between'>
                        {option.map((content, indexContent) => (
                            <>
                                <input
                                    type="text"
                                    value={content}
                                    placeholder={`parametro ${indexContent + 1}`}
                                    className="mb-6 text-lg font-medium text-gray-900 rounded"
                                    onChange={(e) => handleOptionChange(questionIndex, index, e.target.value, indexContent)}
                                />
                                <div className='px-10 text-red-500 flex justify-around select-none'>
                                    <span className={`${content === '' && validationQuestionOption ? 'opacity-100' : 'opacity-0'} transition-[.1s_all] text-xs`}>Las opción no debe ser vacia</span>
                                </div>
                            </>
                        ))}
                    </div> */}
                    <div className='flex flex-col justify-around place-items-center'>
                        <>
                            <div className='px-10 text-red-500 flex justify-around select-none mb-3'>
                                <span className={`${option === '' && validationQuestionOption ? 'opacity-100' : 'opacity-0'} transition-[.1s_all] text-xs`}>Las opción no debe ser vacia</span>
                            </div>
                            <input
                                type="text"
                                value={option}
                                placeholder='ej: Donde 1 es ... y 10 es ...'
                                className={`mb-6 text-lg font-mediumrounded p-2 w-1/2 text-gray-400 text-center mx-auto`}
                                onChange={(e) => handleOptionChange(questionIndex, index, e.target.value)}
                            />
                        </>
                    </div>
                    <ul className="flex justify-center gap-10 mb-4">
                        <li>
                            <input disabled type="radio" id="opcion1" name="escala" value="1" className="hidden peer" />
                            <label
                                htmlFor="opcion1"
                                className="px-4 py-3 text-gray-800 bg-white border-2 border-gray-500 rounded-lg cursor-pointer peer-checked:bg-gray-300 hover:text-gray-600 hover:bg-gray-100 text-2xl select-none"
                            >
                                1
                            </label>
                        </li>
                        <li>
                            <input disabled type="radio" id="opcion2" name="escala" value="2" className="hidden peer" />
                            <label
                                htmlFor="opcion2"
                                className="px-4 py-3 text-gray-800 bg-white border-2 border-gray-500 rounded-lg cursor-pointer peer-checked:bg-gray-300 hover:text-gray-600 hover:bg-gray-100 text-2xl select-none"
                            >
                                2
                            </label>
                        </li>
                        <li>
                            <input disabled type="radio" id="opcion3" name="escala" value="3" className="hidden peer" />
                            <label
                                htmlFor="opcion3"
                                className="px-4 py-3 text-gray-800 bg-white border-2 border-gray-500 rounded-lg cursor-pointer peer-checked:bg-gray-300 hover:text-gray-600 hover:bg-gray-100 text-2xl select-none"
                            >
                                3
                            </label>
                        </li>
                        <li>
                            <input disabled type="radio" id="opcion4" name="escala" value="4" className="hidden peer" />
                            <label
                                htmlFor="opcion4"
                                className="px-4 py-3 text-gray-800 bg-white border-2 border-gray-500 rounded-lg cursor-pointer peer-checked:bg-gray-300 hover:text-gray-600 hover:bg-gray-100 text-2xl select-none"
                            >
                                4
                            </label>
                        </li>
                        <li>
                            <input disabled type="radio" id="opcion5" name="escala" value="5" className="hidden peer" />
                            <label
                                htmlFor="opcion5"
                                className="px-4 py-3 text-gray-800 bg-white border-2 border-gray-500 rounded-lg cursor-pointer peer-checked:bg-gray-300 hover:text-gray-600 hover:bg-gray-100 text-2xl select-none"
                            >
                                5
                            </label>
                        </li>
                        <li>
                            <input disabled type="radio" id="opcion6" name="escala" value="6" className="hidden peer" />
                            <label
                                htmlFor="opcion6"
                                className="px-4 py-3 text-gray-800 bg-white border-2 border-gray-500 rounded-lg cursor-pointer peer-checked:bg-gray-300 hover:text-gray-600 hover:bg-gray-100 text-2xl select-none"
                            >
                                6
                            </label>
                        </li>
                        <li>
                            <input disabled type="radio" id="opcion7" name="escala" value="7" className="hidden peer" />
                            <label
                                htmlFor="opcion7"
                                className="px-4 py-3 text-gray-800 bg-white border-2 border-gray-500 rounded-lg cursor-pointer peer-checked:bg-gray-300 hover:text-gray-600 hover:bg-gray-100 text-2xl select-none"
                            >
                                7
                            </label>
                        </li>
                        <li>
                            <input disabled type="radio" id="opcion8" name="escala" value="8" className="hidden peer" />
                            <label
                                htmlFor="opcion8"
                                className="px-4 py-3 text-gray-800 bg-white border-2 border-gray-500 rounded-lg cursor-pointer peer-checked:bg-gray-300 hover:text-gray-600 hover:bg-gray-100 text-2xl select-none"
                            >
                                8
                            </label>
                        </li>
                        <li>
                            <input disabled type="radio" id="opcion9" name="escala" value="9" className="hidden peer" />
                            <label
                                htmlFor="opcion9"
                                className="px-4 py-3 text-gray-800 bg-white border-2 border-gray-500 rounded-lg cursor-pointer peer-checked:bg-gray-300 hover:text-gray-600 hover:bg-gray-100 text-2xl select-none"
                            >
                                9
                            </label>
                        </li>
                        <li>
                            <input disabled type="radio" id="opcion10" name="escala" value="10" className="hidden peer" />
                            <label
                                htmlFor="opcion10"
                                className="px-4 py-3 text-gray-800 bg-white border-2 border-gray-500 rounded-lg cursor-pointer peer-checked:bg-gray-300 hover:text-gray-600 hover:bg-gray-100 text-2xl select-none"
                            >
                                10
                            </label>
                        </li>
                    </ul>
                </div>
            )}
            {questionTypeValue[question[1][1]] == 'Escala Semántica' && (
                <div className='flex items-center'>
                    <ul className='flex justify-center gap-10 mb-4'>
                        <li
                            key={index}
                        >
                            <input disabled type="radio" id={option + index} name="escala" value={index + 1} className="hidden peer" />
                            <input
                                value={option}
                                htmlFor={option + index}
                                className="text-center p-2 text-gray-800 rounded-lg cursor-pointer bg-gray-200 peer-checked:border-[#39A900] peer-checked:text-[#39A900] peer-checked:bg-white select-none me-4"
                                onChange={(e) => handleOptionChange(questionIndex, index, e.target.value)}
                            />
                        </li>
                    </ul>
                    {question[2].length > 1 && (
                        <div
                            className='font-bold hover:bg-gray-100 p-2 text-xs rounded-md transition-all cursor-pointer'
                            onClick={() => deleteOption(index, questionIndex)}
                        >
                            Eliminar opción
                        </div>
                    )}
                    <div className='px-10 text-red-500 flex justify-around select-none'>
                        <span className={`${option === '' && validationQuestionOption ? 'opacity-100' : 'opacity-0'} transition-[.1s_all] text-xs`}>Las opción no debe ser vacia</span>
                    </div>
                </div>
            )}
        </>
    )
}

export default Options