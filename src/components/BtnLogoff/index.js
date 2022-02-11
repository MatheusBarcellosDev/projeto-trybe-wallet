import React from 'react';
import { useHistory } from 'react-router-dom';

function BtnLoggof() {
  const history = useHistory();
  return (
    <div>
      <button
        type="button"
        className="btn btn-danger"
        onClick={ () => {
          localStorage.removeItem('email');
          history.push('/');
        } }
      >
        Sair
      </button>
    </div>
  );
}

export default BtnLoggof;
