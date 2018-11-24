const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

// super test for server - fernando


const database = 'postgres';

const app = express();
const port = 8080;


app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// app.get('/:projectId', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../public/index.html'));
// });

if (database === 'postgres') {

  const db = require('../database/postgres/index.js');


  app.get('/api/:projectId/updates', (request, response) => {
    const { projectId } = request.params;
    // const projectId = request.params.projectId;
    db.findUpdates(projectId, (error, results) => {
      if (error) {
        response.status(500).send(error);
      } else {
        response.status(201).send('Posted!');
      }
    });
  });

  app.post('/api/:projectId/updates', (request, response) => {
    const { projectId, postedBy, title, body, likes, pubDates } = request.body;
    const data = {
      projectId,
      postedBy,
      
    }
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
    db.modifyUpdates({ updateId }, { projectId, postedBy, title, body, likes, pubDates }, (error, results) => {
      if (error) {
        response.status(500).send(error);
      } else {
        response.status(202).send('Updated!');
      }
    });
  });

  app.delete('/api/:projectId/updates/:updateId', (request, response) => {
    const { updateId } = request.params;
    db.removeUpdates({ updateId }, (error, results) => {
      if (error) {
        response.status(500).send(error);
      } else {
        response.status(202).send('Deleted!');
      }
    });
  });
}


  // const projectId = request.params.id;
  // let data = {
  //   title: request.body.title,
  //   body: request.body.body,
  //   likes: request.body.likes,
  //   pubDate: request.body.pubDate
  // };


  // const initializeSequelize = require('../database/db.js');

  // app.get('/:projectId/updates', (request, response) => {
  //   const { Update, sequelizeConnection, sequelize } = initializeSequelize();
  //   sequelizeConnection.then(() =>
  //     Update.findAll({
  //       where: {
  //         projectId: request.params.projectId
  //       }
  //     })
  //       .then(updates => response.send(updates))
  //       .then(() => sequelize.close())
  //       .catch(err => console.error(err))
  //   );
  // });

  // app.post('/:projectId/updates', (request, response) => {
  //   const { Update, sequelizeConnection, sequelize } = initializeSequelize();
  //   sequelizeConnection.then(() =>
  //     Update.create({
  //       title: request.body.title,
  //       body: request.body.body,
  //       likes: request.body.likes,
  //       pubDate: request.body.pubDate,
  //       projectId: request.body.projectId
  //     })
  //       .then(updates => response.send('Posted'))
  //       .then(() => sequelize.close())
  //       .catch(err => console.error(err))
  //   );
  // });

  // app.put('/:projectId/updates', (request, response) => {
  //   const { Update, sequelizeConnection, sequelize } = initializeSequelize();
  //   sequelizeConnection.then(() =>
  //     Update.update({
  //       title: request.body.title,
  //       body: request.body.body,
  //       likes: request.body.likes,
  //       pubDate: request.body.pubDate
  //     }, {
  //       where: {
  //         projectId: request.params.projectId
  //       }
  //     })
  //       .then(updates => response.send('Updated'))
  //       .then(() => sequelize.close())
  //       .catch(err => console.error(err))
  //   );
  // });

  // app.delete('/:projectId/updates', (request, response) => {
  //   const { Update, sequelizeConnection, sequelize } = initializeSequelize();
  //   sequelizeConnection.then(() =>
  //     Update.destroy({
  //       where: {
  //         projectId: request.params.projectId
  //       }
  //     })
  //       .then(updates => response.send('Deleted'))
  //       .then(() => sequelize.close())
  //       .catch(err => console.error(err))
  //   );
  // });



// if (database === 'mongo') {

//   const initializeSequelize = require('../database/db.js');

//   app.get('/:projectId/updates', (req, res) => {});

//   app.post('/:projectId/updates', (req, res) => {});

//   app.put('/:projectId/updates', (req, res) => {});

//   app.delete('/:projectId/updates', (req, res) => {});

// }

app.listen(port, () => {
  console.log(`Listening at PORT: ${port}`);
});

