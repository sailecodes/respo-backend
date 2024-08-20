# Respo Backend

The backend for the application `Respo`.

## _Layers_

### Top-level

| Framework  | API Handler   | GraphQL Framework | Database   | ORM     | Cloud Services  |
| ---------- | ------------- | ----------------- | ---------- | ------- | --------------- |
| Express.js | Apollo Server | TypeGraphQL       | PostgreSQL | TypeORM | AWS EC2 and RDS |

### Bottom-level

`Express.js` is the backend framework, but there are a number of packages used to create an efficient and scalable application. The important ones are described below:

- `Apollo Server` creates the endpoint for the frontend to communicate with the backend.
- `TypeGraphQL` simplifies TypeScript schema and resolver definitions. As for input validation, `class-validator` enables the use of decorators to further restrict entity definitions.
- `TypeORM` allows the backend to connect to the `PostgreSQL` database on `AWS RDS`.
- `AWS` hosts the backend for production.

## _Deployment_

Deployed on `AWS`.
