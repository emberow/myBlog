"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const swagger_1 = require("./config/swagger");
const database_1 = require("./config/database");
const routes_1 = require("../routes");
(async () => {
    await database_1.default.initialize();
    const app = express();
    const corsOptions = {
        origin: 'http://localhost:8000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
        optionsSuccessStatus: 200,
    };
    app.use(cors(corsOptions));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', routes_1.default);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swagger_1.default)));
    app.listen(process.env.PORT, () => {
        console.log(`Express server listening on port ${process.env.PORT}`);
    });
})();
//# sourceMappingURL=app.js.map