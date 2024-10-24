import React from 'react';
import './ErrorInfo.css'

const ErrorInfo = (message) => {
  return (
    <>
    <div className='error'>
      {message}
    </div>
    <button className='btn btn-outline-primary'>
      Обновить
    </button>
    </>
  );
};

export default ErrorInfo;