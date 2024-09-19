//import {useState, useEffect} from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'

import Home from './Home'; // Página de login
import Register from './reservas'; // Nueva página para el formulario de registro


function App() {
 // const [users, setUsers] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />s
        <Route path="/reservas" element={<Register />} />
      </Routes>
    </Router>
  );


/*
  function getUsers() {
    fetch('http://localhost:3000')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setUsers(data);
      });
  }

  function createUser() {
    let name = prompt('Enter user name');
    let email = prompt('Enter user email');
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getUsers();
      });
  }

  function deleteUser() {
    let id = prompt('Enter user id');
    fetch(`http://localhost:3000/users/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getUsers();
      });
  }

  function updateUser() {
    let id = prompt('Enter user id');
    let name = prompt('Enter new user name');
    let email = prompt('Enter new user email');
    fetch(`http://localhost:3000/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getUsers();
      });
  }

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      {users ? users : 'There is no users data available'}
      <br />
      <button onClick={createUser}>Add user</button>
      <br />
      <button onClick={deleteUser}>Delete user</button>
      <br />
      <button onClick={updateUser}>Update user</button>
    </div>
  );



*/


}
export default App