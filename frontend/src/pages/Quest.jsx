import React from 'react'
import Survey from '../components/Survey';
import Create from '../components/Create';

const Quest = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-[80vh] '>
      <div className='text-center mt-1' style={{ marginBottom: '1rem' }}>
        <Create />
      </div>
      <div className='text-center' style={{
        borderTop: '1px solid #ccc', width: '80%', marginLeft: '5%',
        height: '10px',
      }}>
      </div>
      <div>
        <h1>ENCUESTAS RECIENTES</h1>
        <Survey
          title="Encuesta pedagógica"
          imageSrc="src/img/encuesta.png"
          isActive={true}
        />
      </div>
    </div>
  );
}


export default Quest