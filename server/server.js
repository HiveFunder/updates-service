// EXPRESS DEPENDENCIES
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
// require('dotenv').config({ path: path.resolve(__dirname, `../../${process.env.NODE_ENV}.env`) });
// DATABASE DEPENDENCY

// super test for server

const database = 'postgres';

const HOST_PORT = 3000;
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/:projectId', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

if (database === 'postgres') {

  const initializeSequelize = require('../database/db.js');

  app.get('/:projectId/updates', (req, res) => {
    const { Update, sequelizeConnection, sequelize } = initializeSequelize();
    sequelizeConnection.then(() =>
      Update.findAll({
        where: {
          projectId: req.params.projectId
        }
      })
        .then(updates => res.send(updates))
        .then(() => sequelize.close())
        .catch(err => console.error(err))
    );
  });

  app.post('/api/:projectId/updates', (req, res) => { });

  app.put('/api/:projectId/updates', (req, res) => {});

  app.delete('/api/:projectId/updates', (req, res) => {});

}

if (database === 'mongo') {

  const initializeSequelize = require('../database/db.js');

  app.get('/:projectId/updates', (req, res) => {});

  app.post('/:projectId/updates', (req, res) => {});

  app.put('/:projectId/updates', (req, res) => {});

  app.delete('/:projectId/updates', (req, res) => {});

}

app.listen(HOST_PORT, () => {
  console.log(`Listening at PORT: ${HOST_PORT}`);
});
