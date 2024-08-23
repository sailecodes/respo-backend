# Respo

The source code for the application `Respo`, a Spotify-wannabe-clone.

## _Layers_

### Top-level (Stack)

| Backend Framework | API Handler          | GraphQL Framework | Database   | ORM     | Cloud Services  |
| ----------------- | -------------------- | ----------------- | ---------- | ------- | --------------- |
| Express.js        | Apollo Client/Server | TypeGraphQL       | PostgreSQL | TypeORM | AWS EC2 and RDS |

### Bottom-level

`React.js` is the frontend framework. {...}

- {...}

`Express.js` is the backend framework, but there are a number of packages used to create an efficient and scalable application. The important ones are described below:

- `Apollo Server` creates the endpoint for the frontend to communicate with the backend and is an embedded layer within an HTTP server.
- `TypeGraphQL` simplifies TypeScript schema and resolver definitions. As for input validation, `class-validator` enables the use of decorators to further restrict entity definitions, specifically on the input and argument level.
- `TypeORM` allows the backend to connect to the `PostgreSQL` database on `AWS RDS`.
- `AWS EC2` hosts the application.

## _Deployment_

Deployed on `AWS`.
