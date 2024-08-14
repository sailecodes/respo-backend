import { DataSource } from "typeorm";
import TestUser from "./entities/TestUser";

const db = new DataSource({
  type: "postgres",
  host: "localhost",
  database: "dev_respo",
  port: 5432,
  username: "test",
  password: "test",
  synchronize: true,
  entities: [TestUser],
});

export default db;
