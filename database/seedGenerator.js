const model = require('./db.js');

const generateAllSeedData = require('./seedingUtils');

const data = generateAllSeedData(100);

model.User.bulkCreate(data.users);
model.Project.bulkCreate(data.projects);
model.Update.bulkCreate(data.updates);
