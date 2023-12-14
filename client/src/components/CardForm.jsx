import { useNavigate } from "react-router-dom";

const CardForm = ({ form }) => {
    const { _id, name, status, description } = form;
    const navigate = useNavigate()

    // Navigate to form
    const handleClick = () => {
        navigate(`/forms/v/${_id}`)
    }

    return (
        <div
            className="bg-[#82def0] w-60 mb-5 rounded-lg p-2 transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-xl"
        >
            {/* <img className="" src="../img/imagen-encuesta.jpg" alt="" /> */}
            <div className="p-2">
                <h2 className="text-black text-xl font-black uppercase truncate">
                    {name}
                </h2>
                <p className="text-sm text-gray-600">{description}</p>
            </div>

            <div className="p-2 flex flex-col justify-between items-end">
                {/* <p className="text-sm">Estado:<span className='text-white text-sm'> {status ? 'Activo' : 'Inactivo'}</span></p> */}
                <button
                    onClick={handleClick}
                    className="mt-2 bg-white text-black px-4 py-2 cursor-pointer rounded"
                >ver</button>
            </div>


        </div>
    )
}

export default CardForm