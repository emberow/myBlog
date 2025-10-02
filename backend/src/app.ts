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
import { exec } from 'child_process';
import { getTodayDateString } from './utils/date/date';

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
        origin: [
            'http://localhost',
            'http://localhost:8000',
            'http://blog.emberow.site',
            'http://blog.emberow.online',
        ],
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
        runBackup();

        // 停止接收新的請求
        server.close(() => {
        console.log('Server closed. Exiting process...');
        process.exit(0);
        });
    });
})();

const runBackup = () => {
    return new Promise((resolve, reject) => {
        console.log('--- 準備執行資料庫備份 ---');

        const DB_HOST = process.env.DB_HOST || 'localhost';
        const DB_PORT = process.env.DB_PORT || '5432';
        const DB_DATABASE = process.env.DB_DATABASE || 'blog';
        const DB_USER_NAME = process.env.DB_USER_NAME || 'postgres';
        // !!! 重點修正: 移除 -W <密碼> !!!
        // pg_dump -W 僅用於提示輸入密碼。要傳遞密碼，必須使用 PGPASSWORD 環境變數。
        const DUMP_COMMAND = `pg_dump -h ${DB_HOST} -p ${DB_PORT} -U ${DB_USER_NAME} -d ${DB_DATABASE} -a > ../sqlBackup/myblog${getTodayDateString()}.sql`;

        // 在執行 exec 時設定 PGPASSWORD 環境變數
        exec(DUMP_COMMAND, { 
            env: { ...process.env, PGPASSWORD: process.env.DB_PASSWORD } 
        }, (error, stdout, stderr) => {
            if (error) {
                console.error(`執行備份失敗: ${error.message}`);
                if (stderr) console.error(`pg_dump 錯誤輸出:\n${stderr}`);
                // 即使失敗，也 resolve，因為我們不希望備份失敗就讓程序卡住。
                // 如果需要強制退出，可以使用 reject。
                return resolve(false); 
            }
            
            if (stderr) {
                 console.warn(`pg_dump 警告輸出:\n${stderr}`);
            }

            console.log('--- 資料庫備份成功完成！---');
            console.log('備份檔案: myblog.sql');
            resolve(true); // 備份成功
        });
    });
};