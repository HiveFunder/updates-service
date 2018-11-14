const Sequelize = require('sequelize');
// const loginInfo = require('./db.env.config');

function intitializeSequelize() {
  const sequelize = new Sequelize({
    // database: loginInfo.database,
    // username: loginInfo.user,
    // password: loginInfo.password,
    database: 'kickstarter',
    username: 'root',
    password: '',
    // host: 'db',
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
        console.error('Unable to connect to the database:', err);
      }),
    User,
    Project,
    Update,
    sequelize
  };
}

module.exports = intitializeSequelize;
