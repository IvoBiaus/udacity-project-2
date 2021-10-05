# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

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

## Data Shapes

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
