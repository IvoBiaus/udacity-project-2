CREATE TABLE woods (
  id SERIAL PRIMARY KEY,
  name VARCHAR(16) not null,
  genus VARCHAR(32) not null,
  notes TEXT
);