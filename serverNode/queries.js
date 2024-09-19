import { config } from 'dotenv';

config();
const database = process.env.DATABASE;
const user = process.env.USER;
const host = process.env.HOST;
const password = process.env.PASSWORD;
const port = process.env.PORT;

const Pool = require('pg').Pool
const pool = new Pool({
  user: user,
  host: host,
  database: database,
  password: password,
  port: port,
})


const getUsers = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        } else {
          reject(new Error("No results found"));
        }
      });
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

/*
const getUsers = (request, response) => {
  pool.query('', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
*/

const createUser = (body) => {
  return new Promise(function (resolve, reject) {
    const { name, email } = body;
    pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A new user has been added: ${JSON.stringify(results.rows[0])}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

/*
const createUser = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}
*/


const updateUser = (id, body) => {
  return new Promise(function (resolve, reject) {
    const { name, email } = body;
    pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(`User updated: ${JSON.stringify(results.rows[0])}`);
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

/*
const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}
*/


const deleteUser = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM users WHERE id = $1",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`User deleted with ID: ${id}`);
      }
    );
  });
};

/*
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}
*/

const getAvailableSlots = () => {
  return new Promise(function (resolve, reject) {
    pool.query(
      `SELECT h.id, h.fecha, h.hora_inicio, h.hora_final, c.id, c.tipo
       FROM horarios h
       JOIN canchas c ON h.canchas_horarios_fk = c.id
       WHERE h.disponibilidad = true`,
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

const createReservation = (body) => {
  return new Promise(function (resolve, reject) {
    const { email, cancha_id, horario_id } = body;

    console.log('Email:', email);
    console.log('Cancha ID:', cancha_id);
    console.log('Horario ID:', horario_id);


    // Obtener el usuario por email
    pool.query(
      `SELECT id FROM users WHERE email = $1`,
      [email],
      (error, userResult) => {
        if (error || !userResult.rows.length) {
          return reject(new Error("User not found"));
        }

        const usuario_id = userResult.rows[0].id;

        // Crear la reserva
        pool.query(
          `INSERT INTO public.reservas (users_fk,canchas_fk , horarios_fk) 
           VALUES ($1, $2, $3) RETURNING *`,
          [usuario_id,cancha_id, horario_id ],
          (error, results) => {
            if (error) {
              reject(error);
            }
            if (results && results.rows) {
              // Actualizar la disponibilidad del horario
              pool.query(
                `UPDATE horarios SET disponibilidad = false WHERE id = $1`,
                [horario_id],
                (error) => {
                  if (error) {
                    reject(error);
                  }
                  resolve(
                    `Reservation created: ${JSON.stringify(results.rows[0])}`
                  );
                }
              );
            } else {
              reject(new Error("No results found"));
            }
          }
        );
      }
    );
  });
};


module.exports = {
  getUsers,
 // getUserById,
  createUser,
  updateUser,
  deleteUser,
  getAvailableSlots,
  createReservation,
}