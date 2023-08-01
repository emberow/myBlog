"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = require("log4js");
(0, log4js_1.configure)({
    appenders: {
        out: {
            type: 'stdout',
        },
        project_file_log: {
            type: 'file',
            filename: 'logs/project_out.log',
            maxLogSize: 10485760,
            backups: 7,
            compress: true,
        },
    },
    categories: {
        default: {
            appenders: ['out', 'project_file_log'],
            level: 'info',
        },
    },
    disableClustering: true,
});
exports.default = (0, log4js_1.getLogger)();
//# sourceMappingURL=logger.js.map