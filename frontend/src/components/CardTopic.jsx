import React from 'react'

const CardTopic = ({topic}) => {
    const {name, _id} = topic
    return (
        <div className="bg-[#82def0]  rounded-lg py-8 border-2 border-[#4EA3F1] cursor-pointer hover:bg-[#61b3c4]">
            <p className=" text-white text-2xl text-center font-black uppercase">{name}</p>
        </div>
    )
}

export default CardTopic
