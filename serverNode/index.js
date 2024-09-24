const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000
const multer = require('multer')

/*
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
*/

const upload = multer();  // El archivo PDF se guardará temporalmente aquí

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});




/*
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)
*/


app.get('/', (req, res) => {
  db.getUsers()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/users', (req, res) => {
  db.createUser(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.delete('/users/:id', (req, res) => {
  db.deleteUser(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})


app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  db
    .updateUser(id, body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});



app.get('/available-slots', (req, res) => {
  db.getAvailableSlots()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});


/*
app.post('/reserve', (req, res) => {

  db.createReservation(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

*/

app.post('/reserve', upload.single('comprobante'), (req, res) => {

  const { body } = req;
  const pdfFile = req.file;  // El archivo PDF subido

  db.createReservation(body, pdfFile)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});



app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})