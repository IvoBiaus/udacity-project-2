# Storefront Backend

JavaScript RESTful API to be accessible to the frontend developer.

## Column types by table

**Order:**

- id `SERIAL PRIMARY KEY`
- complete `boolean`
- user_id `int REFERENCES users(id)`
- wands_amount `json NOT NULL` **{ [wand_id: string]: number }**

**User:**

- id `SERIAL PRIMARY KEY`
- username `VARCHAR(100)`
- password_digest `VARCHAR`

**Wand Core:**

- id `SERIAL PRIMARY KEY`
- name `VARCHAR(36) not null`
- notes `TEXT`

**Wand Wood:**

- id `SERIAL PRIMARY KEY`
- name `VARCHAR(16) not null`
- genus `VARCHAR(32) not null`
- notes `TEXT`

**Wand:**

- id `SERIAL PRIMARY KEY`
- wood_id `int REFERENCES woods(id)`
- length `REAL not null`
- core_id `int REFERENCES cores(id)`
- flexibility `VARCHAR(36) not null`
- notes `TEXT`
- price `int NOT NULL`

## ENV variable requirments

**Take in mind that the ENV variable you have to change it manually to switch from test and dev**
POSTGRESS_HOST
POSTGRESS_DB
POSTGRESS_TEST_DB
POSTGRESS_USER
POSTGRESS_PASSWORD

JWT_SECRET
BCRYPT_PASSWORD
SALT_ROUNDS

ENV

## Usage

To intall all the dependencies

```
yarn
```

### Run locally

Server runs at port 3000

```
yarn watch
```

### Testing

The first time:

```
yarn connect
```

then

```
yarn test
```

if it bugs, to remove test database:

```
yarn remove-test
```

### To create the tables

```
yarn remove-test
```

## Endpoints

**Orders:**

- GET: `/orders`
- GET: `/orders/:id` [Token Required]
- GET: `/orders/completed` [Token Required]
- POST: `/orders` [Token Required]
- PUT: `/orders/:id` [Token Required]
- PUT: `/orders/:id/complete` [Token Required]
- DELETE: `/orders/:id` [Token Required]

**Users:**

- GET: `/users` [Token Required]
- GET: `/users/:id` [Token Required]
- GET: `/login`
- POST: `/users`
- PUT: `/users/:id` [Token Required][being owner required]

**Wands Cores:**

- GET: `/cores`
- GET: `/cores/:id`
- POST: `/cores` [Token Required]
- PUT: `/cores/:id` [Token Required]
- DELETE: `/cores/:id` [Token Required]

**Wands Woods:**

- GET: `/woods`
- GET: `/woods/:id`
- POST: `/woods` [Token Required]
- PUT: `/woods/:id` [Token Required]
- DELETE: `/woods/:id` [Token Required]

**Wands:**

- GET: `/wands`
- GET: `/wands/:id`
- POST: `/wands` [Token Required]
- PUT: `/wands/:id` [Token Required]
- DELETE: `/wands/:id` [Token Required]
- remove: `/wands/:id` [Token Required]
