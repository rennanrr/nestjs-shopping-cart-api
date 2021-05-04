## Tech Stack
- NestJS
- Typescript
- TypeORM
- Docker (PostgreSQL)

## Routes:
You can find the routes on /api 
GET /cart - Get all carts or a especific cart by id or by userId
POST /cart - Create a new cart
POST /product-cart - Add a product to a cart
DELETE ​/product-cart​/{id} - Delete a product from a cart

## Get Started
First, make sure you have [NodeJS](https://nodejs.org/en/download/).

### Start docker postgres
```
start:dev:db
```

### Generate Migrations
`
npm run typeorm:migration:generate
`
### Run Migrations
`
npm run typeorm:migration:run
`

### Install packages
```
npm install
```

### Run Server in development mode
```
npm run start:dev
```

### Run Server
```
npm run start
```