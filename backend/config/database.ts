import { DataSource } from 'typeorm';

const PostgresDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: "blog",
  
  migrationsRun: false,
  synchronize: false,
  logging: ['error'],
  maxQueryExecutionTime: 5000,
  entities: [
    "out/entity/*.js"
  ],
})

export default PostgresDataSource;