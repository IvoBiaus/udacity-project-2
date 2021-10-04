# Storefront Backend

JavaScript RESTful API to be accessible to the frontend developer.

## Models

**Order:**

- id: number;
- complete: boolean;
- user_id: number;
- wands_amount: { [wand_id: string]: number };

**User:**

- id: number;
- username: string;
- password_digest: string;

**Wand Core:**

- id: number;
- name: string;
- notes: string;

**Wand Wood:**

- id: number;
- name: string;
- genus: string;
- notes: string;

**Wand:**

- id: number;
- wood_id: number;
- length: number;
- core_id: number;
- flexibility: string;
- notes: string;
- price: number;

## Scripts

### Run locally

**Take in mind that the ENV variable at `.env` is "test" by default so if you want to run "dev" you have to change it manually**

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

## Endpoints

**Orders:**

- index: `/orders`
- show: `/orders/:id` [Token Required]
- completedByUser: `/orders/:id/completed` [Token Required]
- create: `/orders` [Token Required]
- update: `/orders/:id` [Token Required]
- complete: `/orders/:id/complete` [Token Required]
- remove: `/orders/:id` [Token Required]

**Users:**

- index: `/users` [Token Required]
- show: `/users/:id` [Token Required]
- authenticate: `/login`
- create: `/users` [Token Required]
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
