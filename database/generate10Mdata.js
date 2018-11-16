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
  // 'YYYY-MM-DD HH:MM:SS'
  return `${year}-${month}-${day} ${'00'}:${'00'}:${'00'}`;
};

// Random number of updates
const MIN_UPDATES = 2;
const MAX_UPDATES = 10;

function randomNum(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

// Generate the CSV file
const stream = fs.createWriteStream('./updates.csv', {flags: 'a'});

// fs.writeFile('./updates.csv',, (error) => {

stream.write(`projectId,postedBy,title,body,likes,pubDates\n`);

const records = 10 * 1000000;

let i = 0;

let start = new Date();

// for (let i = 0; i < records; i += 1)

function write() {
  while (i < records) {

    let numOfUpdates = randomNum(MIN_UPDATES, MAX_UPDATES);

    for (let j = 0; j < numOfUpdates; j += 1) {
      const ranDate = randomDate(KICKSTARTER_FOUNDED, new Date());

      const projectId = i + 1;
      const postedBy = faker.name.firstName();
      const title = faker.hacker.phrase();
      const body = faker.lorem.paragraph();
      const likes = Math.floor(Math.random() * (500 - 50) + 50);
      const pubDates = formatDateForSQL(ranDate);

      // Create a percentage status
      if ((i + 1) % (records/10000) === 0) {
        console.clear();
        console.log(`${((i/records)*100).toFixed(2)}% complete...`);
      }

      if (!stream.write(`${projectId},${postedBy},${title},${body},${likes},${pubDates}\n`)) {
        return;
      }
    }
    i += 1;
  }

  stream.end();
  let end = new Date();
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


// module.exports = seedDatabase;

// {
//   "id": 52,
//   "title": "I'll program the online FTP panel, that should bandwidth the SCSI firewall!",
//   "body": "In veritatis facilis et sequi quis dolor. Aut fuga alias. Voluptatem molestias minus corrupti adipisci molestias tempora. Autem magnam tenetur animi cumque tenetur sint. Modi sit nihil numquam quia voluptatum aut. Quis eius tenetur dicta architecto id.\n \rVelit sit neque sunt harum. Perspiciatis aspernatur fugit sunt illum ipsam. Sed aliquid et maxime placeat atque fuga occaecati eos.\n \rVoluptatem vel officiis. Laudantium harum dolore. Vel quam velit ipsa numquam quas cumque. Non eligendi pariatur quam est quae veniam modi eligendi cum. In quas vel odio. Minima error reiciendis est omnis.\n \rNesciunt inventore deleniti rerum. Voluptas qui sunt minus. Sit nesciunt molestiae. Vel quos deleniti qui nulla rem doloribus. Omnis sunt et repellat placeat.\n \rEius deleniti non debitis dolores. Reprehenderit ullam reiciendis vel nulla et repellendus minima dignissimos. Voluptatum doloremque voluptas illum maiores similique ut ut distinctio.\n \rEst est corporis dolores quia qui eveniet molestiae. Explicabo laborum consequatur amet sunt. Delectus recusandae sed reiciendis omnis unde ab omnis vitae cupiditate. Sunt veniam iusto perferendis laboriosam aut aperiam velit illum.\n \rAut vel velit qui quaerat ipsum eum. Eum officiis aperiam provident in. Molestias voluptatibus nulla autem esse nobis.\n \rIn omnis ut atque facere. Voluptatem sapiente consectetur quam voluptatem tenetur rem ducimus. Et nemo et ex esse non vel nisi repudiandae.\n \rIn est molestiae. Omnis et animi consequatur necessitatibus consequatur assumenda. Architecto dolorem aut. Nisi sed nulla aut minima eveniet incidunt fugiat natus. Minima modi voluptas et. Eos placeat et.\n \rEt nemo suscipit atque non. Ea in consectetur cupiditate modi consequatur minus quia quia voluptatem. Ut in praesentium cupiditate fugiat aut repudiandae dolores. Illo iure culpa aut accusantium. Iusto sed odio facilis optio. Repellendus harum autem dolores eum deserunt perferendis nihil nisi laudantium.\n \rMinima ut sapiente inventore voluptas omnis qui est voluptate repellendus. Praesentium aliquid possimus quisquam aut nihil esse. Ullam doloremque sed et aut atque.\n \rAspernatur recusandae in quo. Esse neque consequatur voluptatum sunt consequatur ut vero eaque quibusdam. Culpa dolorum fugiat ipsa dolor iste quidem qui dolores aut. Quas totam voluptatem doloremque assumenda. Voluptatem occaecati officia.",
//   "likes": 432,
//   "pubDate": "2018-11-06T08:00:00.000Z",
//   "createdAt": "2018-11-14T04:31:22.000Z",
//   "updatedAt": "2018-11-14T04:31:22.000Z",
//   "postedBy": 10,
//   "projectId": 10
// },

