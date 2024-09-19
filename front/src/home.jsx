import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const goToReserve = () => {
    navigate('/reservas');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <button 
        onClick={goToReserve}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          borderRadius: '5px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none'
        }}
      >
        Ir a Reservar Cancha
      </button>
    </div>
  );
}

export default Home;