CREATE TABLE wands (
  id SERIAL PRIMARY KEY,
  wood_id int REFERENCES woods(id),
  length REAL not null,
  core_id int REFERENCES cores(id),
  flexibility VARCHAR(36) not null,
  notes TEXT,
  price int NOT NULL
); 