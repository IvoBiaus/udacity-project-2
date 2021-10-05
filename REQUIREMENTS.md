# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

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
