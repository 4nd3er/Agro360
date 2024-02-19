import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { useRoles } from '../context/Context.js'
import { FormAlert } from '../components/Components'

const ModalTopic = ({ setTopics, topics }) => {
  const { id } = useParams()
  const [idTopic, setIdTopic] = useState('')
  const { modalTopicForm, handleModalTopic, errors, success, topic, createTopic, editTopic, setErrors, setSuccess } = useRoles()
  const { register, setValue, handleSubmit, formState: { isValid } } = useForm();

  useEffect(() => {
    if (topic?._id) {
      setIdTopic(topic._id)
      setValue('name', topic.name)
      return
    }
    setIdTopic('')
    setValue('name', '')
  }, [topic])

  const onSubmit = handleSubmit(async (data) => {
    const { name } = data
    if (idTopic) {
      const newTopic = await editTopic(idTopic, { role: id, name })
      const updateTopics = [...topics] // Create a copy of the current topics
      updateTopics.push(newTopic.data) // Add the new topic to the copy
      setTopics(updateTopics) // update state of topics
    } else {
      const newTopic = await createTopic({ role: id, name })
      const updateTopics = [...topics] // Create a copy of the current topics
      updateTopics.push(newTopic.data) // Add the new topic to the copy
      setTopics(updateTopics) // update state of topics
    }
    setIdTopic('')
    setValue('name', '')
    setErrors([])
    setSuccess('')
  })

  return (
    <Transition.Root show={modalTopicForm} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleModalTopic}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              {/* close modal */}
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white text-red-400 hover:text-red-600"
                  onClick={handleModalTopic}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title as="h1" className="text-2xl text-center leading-6 font-bold text-color-sena my-4">
                    {idTopic ? 'Editar Temática' : 'Nueva Temática'}
                  </Dialog.Title>

                  <FormAlert errors={errors} success={success} />
                  {/* inicio formulario crear temática */}
                  <form
                    onSubmit={onSubmit}
                    className='mt-8'>
                    <div className="mb-5 flex flex-col justify-start">
                      <label
                        htmlFor="topic"
                        className="text-black font-bold text-start">
                        Nombre de la temática
                      </label>
                      <input
                        id='topic'
                        type="text"
                        placeholder='Título de la temática'
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                        {...register('name', { required: true, minLength: 5 })}
                      />
                    </div>
                    <input
                      type="submit"
                      className={`${isValid ? 'bg-color-sena hover:bg-color-sena-hover' : 'bg-gray-400 !cursor-default'} w-full p-3 text-white text-lg font-bold transition-colors rounded-xl cursor-pointer`}
                      value={idTopic ? 'Guardar cambios' : 'Crear temática'}
                      disable={!isValid} />
                  </form>
                  {/* fin formulario crear tarea */}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ModalTopic
