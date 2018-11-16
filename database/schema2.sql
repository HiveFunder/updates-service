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


-- count table records
-- select count (*) from updates;