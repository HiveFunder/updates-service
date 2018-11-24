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
    .then((results) => callback(results))
    .catch((error) => callback(error));
};


func.addUpdates = (body, callback) => {
  const query = `INSERT INTO updates(projectId, postedBy, title, body, likes, pubDates) VALUES ${values}`;
  const values = body;
  client.query(query, values)
    .then((results) => callback(results))
    .catch((error) => callback(error));
};


func.modifyUpdates = (updateId, body, callback) => {
  const query = `UPDATE updates
                  SET (projectId, postedBy, title, body, likes, pubDates)
                  VALUES ${values}
                  WHERE id = ${updateId}`;
  const values = body;
  client.query(query, values)
    .then((results) => callback(results))
    .catch((error) => callback(error));
};


func.removeUpdates = (updateId, callback) => {
  const query = `DELETE FROM updates WHERE id = ${updateId}`;
  client.query(query)
    .then(results => callback(results))
    .catch(error => callback(error));
};

// console.log('>>>>>>>>>>>>>>>>> HIII', func)

// module.exports = client;

module.exports = func;

