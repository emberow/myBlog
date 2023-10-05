import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import 'dotenv/config';

const resolveFilePath = (): string => {
  return process.env.NODE_ENV === 'production' ? './out/src/entity/*.js' : './*src/entity/*.ts';
};

const PostgresDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  namingStrategy: new SnakeNamingStrategy(),
  migrationsRun: false,
  synchronize: true,
  logging: ['error'],
  maxQueryExecutionTime: 5000,
  entities: [resolveFilePath()],
})

export default PostgresDataSource;