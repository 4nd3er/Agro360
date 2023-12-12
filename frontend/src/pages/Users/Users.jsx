import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useUsers } from '../../context/UsersContext';
import { FormAlert, Spinner } from '../../components/Components';

function Users() {

    const { register, handleSubmit, formState: { isValid }, reset } = useForm();
    const { getCourses, getCourseName, createUser, errors, success } = useUsers();
    const [courses, setCourses] = useState([]);
    const [dataCourses, setDataCourses] = useState([]);
    const [loading, setLoading] = useState(true)

    //Enviar datos
    const onSubmit = handleSubmit(async (data) => {
        const create = await createUser(data);
        if (create) reset();
    })

    //Obtener cursos
    useEffect(() => {
        const Courses = async () => {
            const res = await getCourses();
            setCourses(res)
        }
        Courses();
    }, [])

    //Obtener nombres de los cursos
    useEffect(() => {
        const getDataCourses = async () => {
            courses.forEach(async (course) => {
                const res = await getCourseName(course.name);
                setDataCourses((dataCourses) => [...dataCourses, res])
            })
        }
        getDataCourses();
        setLoading(false)
    }, [courses])

    if (loading) return <Spinner />
    return (
        <div className='w-full flex flex-col justify-center items-center pt-14'>
            <h1 className='text-green-500 text-3xl font-sans font-semibold'>Nuevo Usuario</h1>
            <form onSubmit={onSubmit} className='flex flex-col gap-6 w-1/2 my-10 p-5 border-2 rounded-xl border-green-500'>
                <FormAlert errors={errors} success={success} />
                <div className='form-group flex flex-row gap-6'>
                    <div className='col w-1/2'>
                        <label htmlFor="names">Nombres</label>
                        <input
                            className='w-full m-1 p-2 border rounded-xl bg-gray-50'
                            id="names"
                            type='text'
                            placeholder='Digita tus nombres'
                            {...register("names", {
                                required: true,
                                minLength: 5,
                                maxLength: 30
                            })} />
                    </div>
                    <div className='col w-1/2'>
                        <label htmlFor="lastnames">Apellidos</label>
                        <input
                            className='w-full m-1 p-2 border rounded-xl bg-gray-50'
                            id="lastnames"
                            type='text'
                            placeholder='Digita tus apellidos'
                            {...register("lastnames", {
                                required: true,
                                minLength: 5,
                                maxLength: 30
                            })} />
                    </div>
                </div>

                <div className='form-group flex flex-row gap-6'>
                    <div className='col w-1/2'>
                        <label htmlFor="documentType">Tipo de documento</label>
                        <select
                            className='w-full m-1 p-2 border rounded-xl bg-gray-50'
                            id="documentType"
                            {...register("documentType", {
                                required: true
                            })}>
                            <option value="">Selecciona tu documento</option>
                            <option value="CC">Cedula de Ciudadania</option>
                            <option value="TI">Tarjeta de Identidad</option>
                            <option value="CE">Cedula de Extranjeria</option>
                        </select>
                    </div>
                    <div className='col w-1/2'>
                        <label htmlFor="document">Documento</label>
                        <input
                            className='w-full m-1 p-2 border rounded-xl bg-gray-50'
                            id="document"
                            type='text'
                            maxLength={10}
                            onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); }}
                            placeholder='Digita tu Documento'
                            {...register("document", {
                                required: true,
                                minLength: 7,
                                maxLength: 10
                            })} />
                    </div>
                </div>

                <div className='form-group flex flex-row gap-6'>
                    <div className='col w-1/2'>
                        <label htmlFor="email">Correo Electronico</label>
                        <input
                            className='w-full m-1 p-2 border rounded-xl bg-gray-50'
                            id="email"
                            type='email'
                            placeholder='Digita tu correo'
                            {...register("email", {
                                required: true
                            })} />
                    </div>
                    <div className='col w-1/2'>
                        <label htmlFor="course">Ficha</label>
                        <select
                            className='w-full m-1 p-2 border rounded-xl bg-gray-50'
                            id="course"
                            {...register("course", {
                                required: true
                            })}>
                            <option value="">Selecciona tu ficha</option>
                            {courses ? courses.map((course) => {
                                const courseName = dataCourses.find((dataCourse) => dataCourse._id === course.name)
                                return (
                                    <option key={course._id} value={course._id}>{course.number}: {courseName ? courseName.name : null}</option>
                                )
                            }) : null}
                        </select>
                    </div>
                </div>
                <div className='hidden form-group'>
                    <div className='col w-full'>
                        <label htmlFor="rol">Rol</label>
                        <select
                            className='w-full m-1 p-2 border rounded-xl bg-gray-50'
                            id="rol"
                            {...register("rol")}
                            value="6558e534c44fb9ddd8295320">
                            <option value="">Selecciona tu rol</option>
                            <option value="6558e534c44fb9ddd8295320">Aprendiz</option>
                            <option value="655b1f6df9b6aad257662a58">Instructor</option>
                        </select>
                    </div>
                </div>

                <div className='w-full text-center'>
                    <input
                        type="submit"
                        disabled={!isValid}
                        value="Enviar"
                        className={isValid ? 'bg-green-600 w-1/2 py-2 m-4 text-white uppercase font-bold rounded-xl hover: cursor-pointer hover:bg-green-700 transition-color' : 'bg-gray-400 w-1/2 py-2 m-4 text-white uppercase font-bold rounded-xl hover: cursor-pointer'}
                    />
                </div>
            </form>
        </div>
    )
}

export default Users