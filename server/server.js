// EXPRESS DEPENDENCIES
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
// require('dotenv').config({ path: path.resolve(__dirname, `../../${process.env.NODE_ENV}.env`) });
// DATABASE DEPENDENCY

// super test for server - fernando

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
  // const db = require('../database/index.js');

  app.get('/:projectId/updates', (request, response) => {
    const { Update, sequelizeConnection, sequelize } = initializeSequelize();
    sequelizeConnection.then(() =>
      Update.findAll({
        where: {
          projectId: request.params.projectId
        }
      })
        .then(updates => response.send(updates))
        .then(() => sequelize.close())
        .catch(err => console.error(err))
    );
  });

  app.post('/:projectId/updates', (request, response) => {
    const { Update, sequelizeConnection, sequelize } = initializeSequelize();
    sequelizeConnection.then(() =>
      Update.create({
        title: request.body.title,
        body: request.body.body,
        likes: request.body.likes,
        pubDate: request.body.pubDate,
        projectId: request.body.projectId
      })
        .then(updates => response.send('Posted'))
        .then(() => sequelize.close())
        .catch(err => console.error(err))
    );
  });

  app.put('/:projectId/updates', (request, response) => {
    const { Update, sequelizeConnection, sequelize } = initializeSequelize();
    sequelizeConnection.then(() =>
      Update.update({
        title: request.body.title,
        body: request.body.body,
        likes: request.body.likes,
        pubDate: request.body.pubDate
      },{
        where: {
          projectId: request.params.projectId
        }
      })
        .then(updates => response.send('Updated'))
        .then(() => sequelize.close())
        .catch(err => console.error(err))
    );
  });

  app.delete('/:projectId/updates', (request, response) => {
    const { Update, sequelizeConnection, sequelize } = initializeSequelize();
    sequelizeConnection.then(() =>
      Update.destroy({
        where: {
          projectId: request.params.projectId
        }
      })
        .then(updates => response.send('Deleted'))
        .then(() => sequelize.close())
        .catch(err => console.error(err))
    );
  });
}


  // app.get('/api/:projectId/updates', (request, response) => {
  //   db.findUpdates((error, results) => {
  //     if (error) {
  //       response.status(500).send(error);
  //     } else {
  //       response.status(201).send('Posted!');
  //     }
  //   });
  // });

  // app.post('/api/:projectId/updates', (request, response) => {
  //   let data = {
  //     title: request.body.title,
  //     body: request.body.body,
  //     likes: request.body.likes,
  //     pubDate: request.body.pubDate
  //   };
  //   db.addUpdates(data, (error, results) => {
  //     if (error) {
  //       response.status(500).send(error);
  //     } else {
  //       response.status(201).send('Posted!');
  //     }
  //   });
  // });

  // app.put('/api/:projectId/updates', (request, response) => {
  //   const projectId = request.params.id;
  //   let data = {
  //     title: request.body.title,
  //     body: request.body.body,
  //     likes: request.body.likes,
  //     pubDate: request.body.pubDate
  //   };
  //   db.modifyUpdates(projectId, data, (error, results) => {
  //     if (error) {
  //       response.status(500).send(error);
  //     } else {
  //       response.status(202).send('Updated!');
  //     }
  //   });
  // });

  // app.delete('/api/:projectId/updates', (request, response) => {
  //   const projectId = request.params.id;
  //   db.removeUpdates(projectId, (error, results) => {
  //     if (error) {
  //       response.status(500).send(error);
  //     } else {
  //       response.status(202).send('Deleted!');
  //     }
  //   });
  // });



// if (database === 'mongo') {

//   const initializeSequelize = require('../database/db.js');

//   app.get('/:projectId/updates', (req, res) => {});

//   app.post('/:projectId/updates', (req, res) => {});

//   app.put('/:projectId/updates', (req, res) => {});

//   app.delete('/:projectId/updates', (req, res) => {});

// }

app.listen(HOST_PORT, () => {
  console.log(`Listening at PORT: ${HOST_PORT}`);
});
