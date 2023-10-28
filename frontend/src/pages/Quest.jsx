import React from 'react'
import Forms from '../components/Forms';
import Create from '../components/Create';



const Quest = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-[80vh] '>
      <div className='text-center mt-1' style={{ marginBottom: '1rem' }}>
        <Create />
      </div>

      <div className='text-center' style={{
        borderTop: '1px solid #ccc', width: '70%', marginLeft: '5%',
        height: '10px',

      }}>

      </div>


      <div className='text-center mt-1' style={{ marginTop: '1rem' }}>
        <Forms />
      </div>

    </div>

  );
}


export default Quest