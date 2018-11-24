DROP DATABASE IF EXISTS kickstarter;

CREATE DATABASE kickstarter;
\connect kickstarter;

DROP TABLE IF EXISTS updates;

CREATE TABLE updates (
  id SERIAL PRIMARY KEY,
  projectId INT,
  postedBy VARCHAR(20),
  title VARCHAR(200),
  body TEXT,
  likes INT,
  pubDates DATE
);

COPY updates(projectId, postedBy, title, body, likes, pubDates) FROM '/Users/Li/Desktop/updates-service/database/updates.csv' DELIMITERS ',' CSV;


-- head updates.csv
-- tail updates.csv


-- Postgres Bash Commands 

-- SELECT COUNT (*) from updates; 		// count table records
-- SELECT * FROM updates WHERE id = 60000000;
-- SELECT * FROM updates WHERE projectid = 10000000;
-- CREATE INDEX projectid on updates(projectid);
-- \d updates; 		// describe table
-- \dt    // table list
-- \di    // index list
-- \l  	  // list database
-- \c kickstarter;		// select database
-- \timing
-- \d+		// table size
-- DROP INDEX projectid;
-- \conninfo	  // You are connected to database "kickstarter" as user "Li" via socket in "/tmp" at port "5432".



--Mongo Bash Commands

-- mongoimport --db kickstarter --collection updates --type csv --fields 'projectId,postedBy,title,body,likes,pubDates' --file /database/updates.csv
-- db.updates.find().limit(20);    // First 20 records
-- db.updates.find().sort({ $natural: -1 }).limit(20);		// Last 20 records
-- db.updates.find({projectId:10000000}).explain("executionStats");		// Query
-- db.updates.getIndexes();
-- db.updates.createIndex({projectId:1});
