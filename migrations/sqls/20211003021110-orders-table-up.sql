CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  complete boolean,
  user_id int REFERENCES users(id),
  wands_amount json NOT NULL
);