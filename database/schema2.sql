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


-- Bash Commands PostGres

-- SELECT COUNT (*) from updates; 		count table records
-- SELECT * FROM updates WHERE id = 60000000;
-- SELECT * FROM updates WHERE projectid = 10000000;
-- CREATE INDEX projectid on updates(projectid);
-- \d updates; 	describe table
-- \dt    table list
-- \di    index list
-- \l  	list database
-- \c kickstarter;		select database
-- \timing