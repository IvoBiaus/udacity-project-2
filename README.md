# Storefront Backend

JavaScript RESTful API to be accessible to the frontend developer.

## Column types by table

**Order:**

- id SERIAL PRIMARY KEY
- complete boolean
- user_id int REFERENCES users(id)
- wands_amount json NOT NULL `{ [wand_id: string]: number }`

**User:**

- id SERIAL PRIMARY KEY
- username VARCHAR(100)
- password_digest VARCHAR

**Wand Core:**

- id SERIAL PRIMARY KEY
- name VARCHAR(36) not null
- notes TEXT

**Wand Wood:**

- id SERIAL PRIMARY KEY
- name VARCHAR(16) not null
- genus VARCHAR(32) not null
- notes TEXT

**Wand:**

- id SERIAL PRIMARY KEY
- wood_id int REFERENCES woods(id)
- length REAL not null
- core_id int REFERENCES cores(id)
- flexibility VARCHAR(36) not null
- notes TEXT
- price int NOT NULL

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

- index: `/orders`
- show: `/orders/:id` [Token Required]
- completedByUser: `/orders/completed` [Token Required]
- create: `/orders` [Token Required]
- update: `/orders/:id` [Token Required]
- complete: `/orders/:id/complete` [Token Required]
- remove: `/orders/:id` [Token Required]

**Users:**

- index: `/users` [Token Required]
- show: `/users/:id` [Token Required]
- authenticate: `/login`
- create: `/users`
- update: `/users/:id` [Token Required][being owner required]

**Wands Cores:**

- index: `/cores`
- show: `/cores/:id`
- create: `/cores` [Token Required]
- update: `/cores/:id` [Token Required]
- remove: `/cores/:id` [Token Required]

**Wands Woods:**

- index: `/woods`
- show: `/woods/:id`
- create: `/woods` [Token Required]
- update: `/woods/:id` [Token Required]
- remove: `/woods/:id` [Token Required]

**Wands:**

- index: `/wands`
- show: `/wands/:id`
- create: `/wands` [Token Required]
- update: `/wands/:id` [Token Required]
- remove: `/wands/:id` [Token Required]
