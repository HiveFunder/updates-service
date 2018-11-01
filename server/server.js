// EXPRESS DEPENDENCIES
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// DATABASE DEPENDENCY
const db = require('../database/db.js');

const app = express();

const port = 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/:projectId/updates', (req, res) => {
  db.Update.findAll({
    where: {
      projectId: req.params.projectId
    }
  })
    .then(updates => {
      res.send(updates);
    })
    .catch(err => console.error(err));
});

app.listen(port);
console.log(`Listening at PORT: ${port}`); // eslint-disable-line
