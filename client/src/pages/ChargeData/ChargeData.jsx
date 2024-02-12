import React from 'react'
import { useForm } from 'react-hook-form'
import { useChargeData } from '../../context/Context';
import { FormAlert, Spinner } from '../../components/Components'
import { formatDate } from '../../helpers/formatDate';

function ChargeData() {
    const { createCourses, createCronograms, createInstructors, createUsers, errors, success, loading } = useChargeData();
    const { register: courses, handleSubmit: courseSubmit, formState: { isValid: validCourse } } = useForm();
    const { register: cronograms, handleSubmit: cronogramSubmit, formState: { isValid: validCronogram } } = useForm();
    const { register: instructors, handleSubmit: instructorSubmit, formState: { isValid: validInstructor } } = useForm();
    const { register: users, handleSubmit: usersSubmit, formState: { isValid: validUsers } } = useForm();

    const onSubmitCourse = courseSubmit(async (data) => {
        const file = new FormData()
        for (let i = 0; i < data.courses.length; i++) {
            file.append('courses', data.courses[i])
        }
        createCourses(file)
    })

    const onSubmitCronogram = cronogramSubmit(async (data) => {
        const file = new FormData()
        for (let i = 0; i < data.cronograms.length; i++) {
            file.append('cronograms', data.cronograms[i])
        }
        createCronograms(file)
    })

    const onSubmitInstructor = instructorSubmit(async (data) => {
        const file = new FormData()
        for (let i = 0; i < data.instructors.length; i++) {
            file.append('instructors', data.instructors[i])
        }
        createInstructors(file)
    })

    const onSubmitUsers = usersSubmit(async (data) => {
        const file = new FormData()
        for (let i = 0; i < data.users.length; i++) {
            file.append('users', data.users[i])
        }
        createUsers(file)
    })

    if (loading) return <Spinner />

    return (
        <div className='w-full flex flex-col p-5 justify-center items-center gap-8'>
            <h1 className='text-3xl font-bold text-color-sena'>Cargar Datos</h1>
            <FormAlert errors={errors} success={success} className={'!m-0'} />
            <form className='w-1/2' encType='multipart/form-data' onSubmit={onSubmitCourse}>
                <label className="form-label">Fichas</label>
                <div className="flex flex-row gap-1">
                    <input type="file" name="courses" className="focus:border-color-sena focus:ring-color-sena block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" accept='.xlsx, .xls' multiple
                        {...courses("courses", {
                            required: true,
                        })} />
                    <input name="" id="" className={`${validCourse ? 'bg-color-sena hover:bg-color-sena-hover' : 'bg-gray-500'} btn text-white`} type="submit" disabled={!validCourse} value="Enviar" />
                </div>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">XLS, XLSX</p>
            </form>
            <form className='w-1/2' encType='multipart/form-data' onSubmit={onSubmitCronogram}>
                <label className="form-label">Cronogramas de Fichas</label>
                <div className="flex flex-row gap-1">
                    <input type="file" name="cronograms" className="focus:border-color-sena focus:ring-color-sena block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" accept='.xlsx, .xls' multiple
                        {...cronograms("cronograms", {
                            required: true
                        })} />
                    <input name="" id="" className={`${validCronogram ? 'bg-color-sena hover:bg-color-sena-hover' : 'bg-gray-500'} btn text-white`} type="submit" disabled={!validCronogram} value="Enviar" />
                </div>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">XLS, XLSX</p>
            </form>
            <form className='w-1/2' encType='multipart/form-data' onSubmit={onSubmitInstructor}>
                <label className="form-label">Instructores</label>
                <div className="flex flex-row gap-1">
                    <input type="file" name="instructors" className="focus:border-color-sena focus:ring-color-sena block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" accept='.xlsx, .xls' multiple
                        {...instructors("instructors", {
                            required: true
                        })} />
                    <input name="" id="" className={`${validInstructor ? 'bg-color-sena hover:bg-color-sena-hover' : 'bg-gray-500'} btn text-white`} type="submit" disabled={!validInstructor} value="Enviar" />
                </div>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">XLS, XLSX</p>
            </form>
            <form className='w-1/2' encType='multipart/form-data' onSubmit={onSubmitUsers}>
                <label className="form-label">Usuarios</label>
                <div className="flex flex-row gap-1">
                    <input type="file" name="users" className="focus:border-color-sena focus:ring-color-sena block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" accept='.xlsx, .xls' multiple
                        {...users("users", {
                            required: true
                        })} />
                    <input name="" id="" className={`${validUsers ? 'bg-color-sena hover:bg-color-sena-hover' : 'bg-gray-500'} btn text-white`} type="submit" disabled={!validUsers} value="Enviar" />
                </div>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">XLS, XLSX</p>
            </form>
        </div>
    )
}

export default ChargeData