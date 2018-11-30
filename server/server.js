const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const newrelic = require('newrelic');
const db = require('../database/postgres/index.js');

// const database = 'postgres';

const app = express();
const port = 3004;


app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api/:projectId', express.static(path.join(__dirname, '../public')));


// if (database === 'postgres') {
app.get('/loaderio-361b5c6ef2b6fe496e8728b38c440e23.txt/', (request, response) => {
  response.sendFile(path.join(__dirname, '../loaderio.txt'));
});


app.get('/api/:projectId/updates', (request, response) => {
  const { projectId } = request.params;
  // console.log(projectId)
  // const projectId = request.params.projectId;
  db.findUpdates(projectId, (error, results) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.status(200).send(results);
    }
  });
});

// app.get('/api/:projectId/updates', (request, response) => {
//   const { projectId } = request.params;
//   db.findUpdates(projectId)
//     .then(results => response.status(200).send(results))
//     .catch(error => response.status(500).send(error));
// });

app.post('/api/:projectId/updates', (request, response) => {
  const { projectId, postedBy, title, body, likes, pubDates } = request.body;
  // const projectId = request.body.projectId;
  // const postedBy = request.body.postedBy;
  db.addUpdates(projectId, postedBy, title, body, likes, pubDates, (error, results) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.status(201).send('Posted!');
    }
  });
});

app.put('/api/:projectId/updates/:updateId', (request, response) => {
  const { updateId } = request.params;
  const { projectId, postedBy, title, body, likes, pubDates } = request.body;
  db.modifyUpdates(updateId, projectId, postedBy, title, body, likes, pubDates, (error, results) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.status(202).send('Updated!');
    }
  });
});

app.delete('/api/:projectId/updates/:updateId', (request, response) => {
  const { updateId } = request.params;
  db.removeUpdates(updateId, (error, results) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.status(202).send('Deleted!');
    }
  });
});

// }

app.listen(port, () => {
  console.log(`Listening at PORT: ${port}`);
});


// super test for server - fernando
