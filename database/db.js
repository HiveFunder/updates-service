const Sequelize = require('sequelize');
const loginInfo = require('./db.env.config');
const MAX_ATTEMPTS = 10;
const ATTEMPT_DELAY = 1500;

function delay(miliseconds) {
  let ctr;
  let rej;
  const promise = new Promise((resolve, reject) => {
    ctr = setTimeout(resolve, miliseconds);
    rej = reject;
  });
  promise.cancel = () => {
    clearTimeout(ctr);
    rej(Error('Cancelled'));
  };
  return promise;
}

function intitializeSequelize(attempts = 0) {
  const sequelize = new Sequelize({
    database: loginInfo.database,
    username: loginInfo.user,
    password: loginInfo.password,
    host: 'localhost',
    dialect: 'mysql',
    define: {
      allowNull: false
    }
  });

  const User = sequelize.define('user', {
    userName: Sequelize.STRING(100)
  });
  const Project = sequelize.define('project', {
    projectName: Sequelize.STRING
  });
  Project.belongsTo(User, { foreignKey: 'ownerId' });
  const Update = sequelize.define('update', {
    title: Sequelize.STRING,
    body: Sequelize.TEXT,
    likes: Sequelize.INTEGER,
    pubDate: Sequelize.DATE
  });
  Update.belongsTo(User, { foreignKey: 'postedBy' });
  Update.belongsTo(Project, { foreignKey: 'projectId' });

  return {
    sequelizeConnection: sequelize
      .authenticate()
      .then(() => {
        console.log('MYSQL connection has been established...');
      })
      .catch(err => {
        if (attempts <= MAX_ATTEMPTS) {
          console.error('Unable to connect to the database. Will reattempt in 15 seconds:', err);
          return delay(ATTEMPT_DELAY).then(intitializeSequelize(attempts + 1));
        }
        console.error('Unable to connect to the database. No further attempts:', err);
      }),
    User,
    Project,
    Update,
    sequelize
  };
}

module.exports = intitializeSequelize;
