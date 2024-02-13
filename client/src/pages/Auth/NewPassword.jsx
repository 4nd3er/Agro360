import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/Context";
import { FormAlert } from "../../components/Components";
import { useParams, useNavigate } from "react-router-dom";

const NewPassword = () => {
  const navigate = useNavigate()
  const token = new URLSearchParams(window.location.search).get('token')

  const { register, handleSubmit, formState: { isValid } } = useForm();
  const { resetPassword, errors, success } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    const res = await resetPassword(data, token)
    if (res) setTimeout(() => navigate('/'), 3000)
  })

  return (
    <>
      <div className="flex  justify-center items-center min-h-[80vh]">
        <div className="w-1/4 h-full flex flex-col justify-center">
          <h1 className="text-green-800 font-black text-6xl capitalize">
            AGRO
            <span className="text-green-500 text-8xl">360°</span>
            <p className='text-green-800 text-2xl flex justify-center font-extrabold'>Key Performance Indicator</p>
          </h1>
        </div>

        <div className="w-3/5 h-full ">
          <div className=" flex flex-col justify-center place-items-center min-h-[80vh] ">
            <strong className=' text-green-600  text-3xl capitalize font-sans'>Recupera tu contraseña</strong>
            <form className='bg-white shadow rounded-lg px-10 py-5 w-1/2' onSubmit={onSubmit}>
              <FormAlert errors={errors} success={success} />
              <div className='my-5'>
                <label className=' text-gray-600 block text-sm font-bold' htmlFor='newPassword'>Nueva contraseña</label>
                <input id='newPassword' type="password" placeholder='Digita tu nueva contraseña' className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                  {...register("password", {
                    required: true,
                    minLength: 8
                  })}
                />
              </div>
              <input
                type="submit"
                value="Enviar"
                className={`${isValid ? 'bg-green-600 hover:bg-green-700 hover:cursor-pointer' : 'bg-gray-500'} w-full py-1 text-white uppercase font-bold rounded-xl transition-color `}
                disabled={!isValid} />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewPassword
