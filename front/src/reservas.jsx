import React, { useState, useEffect } from 'react';

function Register() {
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCancha, setSelectedCancha] = useState('');
  const [filteredSlots, setFilteredSlots] = useState([]);
  const [selectedHorario, setSelectedHorario] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/available-slots')
      .then(response => response.json())
      .then(data => setSlots(data))
      .catch(error => console.error('Error fetching available slots:', error));
  }, []);

  // Filtrar los slots disponibles cuando el usuario selecciona una fecha
  useEffect(() => {
    if (selectedDate) {
      setFilteredSlots(slots.filter(slot => slot.fecha === selectedDate));
    }
  }, [selectedDate, slots]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/reserve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, cancha_id: selectedCancha, horario_id: selectedHorario }),
    })
      .then(response => response.text())
      .then(data => {
        alert(data);
      })
      .catch(error => {
        console.error('Error creating reservation:', error);
      });
  };

  // Obtener una lista de fechas únicas de los horarios disponibles
  const uniqueDates = [...new Set(slots.map(slot => slot.fecha))];

  return (
    <div>
      <h1>Registrar reserva</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fecha:</label>
          <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} required>
            <option value="" disabled>Select Date</option>
            {uniqueDates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Cancha:</label>
          <select value={selectedCancha} onChange={(e) => setSelectedCancha(e.target.value)} required>
            <option value="" disabled>Select Cancha</option>
            {filteredSlots.map((slot) => (
              <option key={slot.id} value={slot.id}>
                {`Cancha ${slot.tipo}`}
              </option>
            ))}                                  
          </select>
        </div>
        <div>
          <label>Horario:</label>
          <select value={selectedHorario} onChange={(e) => setSelectedHorario(e.target.value)} required>
            <option value="" disabled>Select Horario</option>
            {filteredSlots.map((slot) => (
              <option key={slot.id} value={slot.id}>
                {`${slot.hora_inicio} - ${slot.hora_final}`}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Reserve</button>
      </form>
    </div>
  );
}

export default Register;