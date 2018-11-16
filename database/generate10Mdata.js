// const mysql = require('mysql');
// const loginInfo = require('./db.env.config');
// const generateAllSeedData = require('./seedingUtils');
// const initializeSequelize = require('./db');
const faker = require('faker');
const fs = require('fs');

// Generate Publish Date
const KICKSTARTER_FOUNDED = new Date(2009, 3, 28);

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

function intPadLeft(num) {
  if (String(num).length < 2) {
    return `0${num}`;
  }
  return String(num);
};

function formatDateForSQL(date) {
  const year = date.getFullYear();
  const month = intPadLeft(date.getMonth() + 1);
  const day = intPadLeft(date.getDate());
  return `${year}-${month}-${day} ${'00'}:${'00'}:${'00'}`;    // 'YYYY-MM-DD HH:MM:SS'
};

// Random number of updates
const MIN_UPDATES = 2;
const MAX_UPDATES = 10;

function randomNum(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

// Dont need the header tabs
// stream.write(`projectId,postedBy,title,body,likes,pubDates\n`);
// fs.writeFile('./updates.csv',, (error) => {
// for (let i = 0; i < records; i += 1)

// Generate the CSV file
const stream = fs.createWriteStream('./updates.csv', { flags: 'a' });

const records = 10 * 1000000;      // Number of primary records by million count

let i = 0;

const start = new Date();

function write() {
  while (i < records) {

    let numOfUpdates = randomNum(MIN_UPDATES, MAX_UPDATES);      // Number of updates per project

    for (let j = 0; j < numOfUpdates; j += 1) {
      const ranDate = randomDate(KICKSTARTER_FOUNDED, new Date());

      // const id = i + j + 1;
      const projectId = i + 1;
      const postedBy = faker.name.firstName();
      const title = faker.hacker.phrase().replace(/,/g, '');
      const body = faker.lorem.paragraph();
      const likes = Math.floor(Math.random() * (500 - 50) + 50);
      const pubDates = formatDateForSQL(ranDate);

      // Create a percentage status
      if ((i + 1) % (records / 10000) === 0) {
        console.clear();
        console.log(`${((i / records) * 100).toFixed(2)}% complete...`);
      }

      if (!stream.write(`${projectId},${postedBy},${title},${body},${likes},${pubDates}\n`)) {
        return;
      }
    }
    i += 1;
  }

  stream.end();
  const end = new Date();
  console.log(`Took ${end - start} milliseconds to write ${records} files`);
}

stream.on('drain', () => {
  write();
});
write();


// terminal commands
// head updates.csv

// tail updates.csv

// wc updates.csv

