import { ConnectionOptions } from 'typeorm';



const dbconfig: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "32865417",
  database: "blog",
  
  migrationsRun: false,
  synchronize: false,
  logging: ['error'],
  maxQueryExecutionTime: 5000,
  entities: [
    "out/entity/*.js"
  ],
};

export default dbconfig;