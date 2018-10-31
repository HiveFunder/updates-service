const DATABASE = 'kickstarter';
const USERNAME = 'root';
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  database: DATABASE,
  username: USERNAME,
  password: null,
  host: 'localhost',
  dialect: 'mysql',
  define: {
    allowNull: false
  },
  sync: { force: true }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('MYSQL connection has been established...');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const User = sequelize.define('user', {
  userName: Sequelize.STRING(100)
});

const Project = sequelize.define('project', {
  projectName: Sequelize.STRING
});

const Update = sequelize.define('update', {
  title: Sequelize.STRING,
  body: Sequelize.TEXT,
  likes: Sequelize.INTEGER,
  pubDate: Sequelize.DATE
});

Project.belongsTo(User, { foreignKey: 'ownerId' });
Update.belongsTo(User, { foreignKey: 'postedBy' });
Update.belongsTo(Project, { foreignKey: 'projectId' });

User.sync();
Project.sync();
Update.sync();

exports.User = User;
exports.Project = Project;
exports.Update = Update;
