import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { useUsers } from '../../context/UsersContext';
import { FormAlert, Spinner } from '../../components/Components';
import { validateSenaEmail } from '../../helpers/functions';
import '../../App.css'

function Users() {
    const { register, handleSubmit, formState: { isValid }, control } = useForm();
    const { getCourses, getCourseNames, createUser, errors, success } = useUsers();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true)

    //Enviar datos
    const onSubmit = handleSubmit(async (data) => {
        const res = await createUser(data);
        if (res) {
            setTimeout(() => {
                window.history.back()
            }, 3000)
        }
    })

    //Obtener cursos
    useEffect(() => {
        const Courses = async () => {
            const courseNames = await getCourseNames();
            const coursesData = await getCourses();
            const courses = coursesData.map(({ _id, name: courseNameId, number }) => {
                const name = courseNames.find(({ _id }) => _id === courseNameId).name
                return {
                    value: _id,
                    label: `${number}: ${name}`
                }
            })
            setCourses(courses)
            setLoading(false)
        }
        Courses();
    }, [])

    if (loading) return <Spinner />

    return (
        <div className='w-full flex flex-col justify-center items-center pt-14'>
            <form onSubmit={onSubmit} className='flex flex-col gap-6 w-1/2 my-10 p-10 border-2 rounded-xl border-gray-300 shadow-xl'>
                <h1 className='text-green-500 text-3xl font-sans font-semibold w-full text-center mb-6'>Nuevo Usuario</h1>
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
                            placeholder='Digita tu correo @SoySena'
                            {...register("email", {
                                required: true,
                                validate: (value) => validateSenaEmail(value)
                            })} />
                    </div>
                    <div className='col w-1/2'>
                        <label>Ficha</label>
                        <div className='select-container mt-2'>
                            <Controller
                                name="course"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={courses}
                                        placeholder={"Selecciona tu ficha"}
                                        noOptionsMessage={() => "No se encontraron fichas"}
                                        onChange={val => field.onChange(val.value)}
                                        value={courses.find(({ value }) => value === field.value)}
                                        required
                                        classNamePrefix="react-select"
                                        styles={{
                                            control: (provided, state) => ({
                                                ...provided,
                                                borderColor: state.isFocused ? '#369206' : provided.borderColor
                                            }),
                                            '&:hover': {
                                                borderColor: '#369206',
                                            }
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div className='hidden form-group'>
                    <div className='col w-full'>
                        <label htmlFor="rol">Rol</label>
                        <select
                            className='w-full m-1 p-2 border rounded-xl bg-gray-50'
                            id="rol"
                            {...register("rol")}
                            value="6558e534c44fb9ddd8295320"
                            readOnly>
                            <option value="">Selecciona tu rol</option>
                            <option value="6558e534c44fb9ddd8295320">Aprendiz</option>
                        </select>
                    </div>
                </div>

                <div className='w-full text-center'>
                    <input
                        type="submit"
                        disabled={!isValid}
                        value="Enviar"
                        className={isValid ? 'bg-green-600 w-1/2 py-2 m-4 text-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-green-700 transition-color' : 'bg-gray-400 w-1/2 py-2 m-4 text-white uppercase rounded-xl'}
                    />
                </div>
            </form>
        </div>
    )
}

export default Users