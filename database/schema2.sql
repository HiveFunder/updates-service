DROP DATABASE IF EXISTS kickstarter;

CREATE DATABASE kickstarter;
\connect kickstarter;

DROP TABLE IF EXISTS updates;

CREATE TABLE updates (
  updatesId SERIAL PRIMARY KEY,
  projectId INT,
  postedBy VARCHAR(20),
  title VARCHAR(100),
  body TEXT,
  likes INT,
  pubDates DATE
);

COPY updates FROM './Users/Li/Desktop/updates-service/database/updates.csv'