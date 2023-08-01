"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpHandler = void 0;
const httpHandler = (res, httpStatusCode, data, message) => {
    let status;
    if (httpStatusCode === 200) {
        status = 'success';
    }
    else {
        status = 'error';
    }
    res.status(httpStatusCode).json({
        "status": status,
        "data": data,
        "message": message,
    });
};
exports.httpHandler = httpHandler;
//# sourceMappingURL=httpHandler.js.map