import 'dotenv/config';

import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerJSDoc from 'swagger-jsdoc';
import swaggerConfig from './config/swagger';
import DataSource from './config/database';
import router from '../routes';

(async () => {
    await DataSource.initialize();
    const app = express();
    app.use(
        cors({
            origin: ['http://localhost'],
        }),
    );

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', router);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerConfig)));

    app.listen(process.env.PORT, () => {
        console.log(`Express server listening on port ${process.env.PORT}`);
    });
})();