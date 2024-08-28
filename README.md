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

The backend has two separate validation layers: validation based on how fields should be in the database and validation against the database. As such, validation regarding the length of a string, the value of a number, or anything else similar, are accomplished at the decoration level. On the other hand, validation regarding the uniqueness or existence of a field in the database, or likewise, are done at the resolver level. This is to implement consistent validation across these layers.

## _Deployment_

Deployed on `AWS`.

## _Issues_

'Cannot query across many-to-many for property subject typeorm...'

- Solution: Use `.save()` for relation updates

'AggregateError...Error: connect ECONNREFUSED 127.0.0.1:6379...'

- Solution: Must initialize Redis instance, i.e. `sudo systemctl start redis` or `sudo service redis-server start` on WSL

'TypeError: client.get/set is not a function...'

- Solution: Must initialize redisClient as `const redisClient = createClient(); redisClient.connect().catch(console.error);` and not `const redisClient = createClient().connect()`
