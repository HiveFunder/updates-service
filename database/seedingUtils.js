const faker = require('faker');

const LIKES_LIMIT = 500;
const BODY_PARAGRAPH_MAX = 15;
const BODY_PARAGRAPH_MIN = 2;
const MIN_UPDATES = 2;
const MAX_UPDATES = 10;
const KICKSTARTER_FOUNDED = new Date(2009, 3, 28);

let updateCount = 0;

function getName() {
  return faker.name.findName();
}

function getLikes() {
  return Math.floor(Math.random() * LIKES_LIMIT);
}

function getUpdateBody() {
  // from 2 to 15 paragraphs
  const paragraphCount =
    Math.floor(Math.random() * (BODY_PARAGRAPH_MAX - BODY_PARAGRAPH_MIN + 1)) + BODY_PARAGRAPH_MIN;
  return faker.lorem.paragraphs(paragraphCount);
}

function getTitle() {
  return faker.hacker.phrase();
}

function randomNum(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function intPadLeft(num) {
  if (String(num).length < 2) {
    return `0${num}`;
  }
  return String(num);
}

function formatDateForSQL(date) {
  const year = date.getFullYear();
  const month = intPadLeft(date.getMonth() + 1);
  const day = intPadLeft(date.getDate());
  // 'YYYY-MM-DD HH:MM:SS'
  return `${year}-${month}-${day} ${'00'}:${'00'}:${'00'}`;
}

function generateUserData(userId) {
  return {
    userId,
    userName: getName()
  };
}

function generateProjectData(ownerId, projectId) {
  return {
    ownerId,
    projectId,
    projectName: getTitle()
  };
}

function getUpdateData(postedBy, projectId) {
  const date = randomDate(KICKSTARTER_FOUNDED, new Date());
  updateCount += 1;

  return {
    postedBy,
    projectId,
    title: getTitle(),
    id: updateCount,
    body: getUpdateBody(),
    likes: getLikes(),
    pubDate: formatDateForSQL(date)
  };
}

function generateUpdates(userIdx, projectIdx) {
  const numOfUpdates = randomNum(MIN_UPDATES, MAX_UPDATES);
  const updates = [];

  for (let i = 0; i < numOfUpdates; i += 1) {
    updates.push(getUpdateData(userIdx, projectIdx));
  }
  return updates;
}

function generateAllSeedData(num) {
  const data = {
    users: [],
    projects: [],
    updates: []
  };

  for (let i = 1; i <= num; i += 1) {
    data.users.push(generateUserData(i));
    data.projects.push(generateProjectData(i, i));

    generateUpdates(i, i).forEach(update => {
      data.updates.push(update);
    });
  }

  return data;
}

module.exports = generateAllSeedData;
