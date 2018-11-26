const { Client } = require('pg');

const client = new Client({
  user: 'Li',
  host: 'localhost',
  password: 'pw',
  database: 'kickstarter',
  port: 5432,
});

client.connect();


const func = {};

func.findUpdates = (projectId, callback) => {
  const query = `SELECT * FROM updates WHERE projectid = ${projectId}`;
  client.query(query)
    .then((results) => callback(null, results))
    .catch((error) => callback(error, null));
};


func.addUpdates = (projectId, postedBy, title, body, likes, pubDates, callback) => {
  const query = `INSERT INTO updates(projectId, postedBy, title, body, likes, pubDates) VALUES ($1, $2, $3, $4, $5, $6)`;
  const values = [projectId, postedBy, title, body, likes, pubDates];
  client.query(query, values)
    .then((results) => callback(null, results))
    .catch((error) => callback(error, null));
};


func.modifyUpdates = (updateId, projectId, postedBy, title, body, likes, pubDates, callback) => {
  const query = `UPDATE updates
                  SET (projectId, postedBy, title, body, likes, pubDates)
                  VALUES ($1, $2, $3, $4, $5, $6)
                  WHERE id = ${updateId}`;
  const values = [projectId, postedBy, title, body, likes, pubDates];
  client.query(query, values)
    .then((results) => callback(null, results))
    .catch((error) => callback(error, null));
};


func.removeUpdates = (updateId, callback) => {
  const query = `DELETE FROM updates WHERE id = ${updateId}`;
  client.query(query)
    .then(results => callback(null, results))
    .catch(error => callback(error, null));
};

// console.log('>>>>>>>>>>>>>>>>> HIII', func)

// module.exports = client;

module.exports = func;

