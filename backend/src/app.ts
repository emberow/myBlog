import 'dotenv/config';

import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerJSDoc from 'swagger-jsdoc';
import swaggerConfig from './config/swagger';
import DataSource from './config/database';
import router from '../routes';
import { errorHandler } from './middleware/errors';

(async () => {
    while (true) {
        try {
            await DataSource.initialize();
            break;
        } catch (error) {
            console.log('Failed to connect to database. Retrying in 5 seconds...');
            await new Promise((resolve) => setTimeout(resolve, 5000));
        }
    }
    const app = express();
    const corsOptions = {
        origin: ['http://localhost:8000', 'http://blog.emberow.site'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
        optionsSuccessStatus: 200,
    };
    app.use(
        cors(corsOptions),
    );

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', router);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerConfig)));
    app.use(errorHandler);

    const server = app.listen(process.env.PORT, () => {
        console.log(`Express server listening on port ${process.env.PORT}`);
    });


    // 處理中斷服務 (ctrl+c)
    process.on('SIGTERM', () => {
        console.log('Received SIGTERM. Shutting down gracefully...');

        // 停止接收新的請求
        server.close(() => {
        console.log('Server closed. Exiting process...');
        process.exit(0);
        });
    });

    // request program shutdown
    process.on('SIGINT', () => {
        console.log('Received SIGINT. Shutting down gracefully...');

        // 停止接收新的請求
        server.close(() => {
        console.log('Server closed. Exiting process...');
        process.exit(0);
        });
    });
})();