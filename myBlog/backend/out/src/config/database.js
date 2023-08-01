"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
require("dotenv/config");
const resolveFilePath = () => {
    return process.env.NODE_ENV === 'production' ? './out/src/entity/*.js' : './*src/entity/*.ts';
};
const PostgresDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: "blog",
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
    migrationsRun: false,
    synchronize: true,
    logging: ['error'],
    maxQueryExecutionTime: 5000,
    entities: [resolveFilePath()],
});
exports.default = PostgresDataSource;
//# sourceMappingURL=database.js.map