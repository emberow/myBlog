"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signJwt = void 0;
const jwt = require("jsonwebtoken");
const signJwt = async (values) => {
    var privateKey = process.env.JWT_PRIVATE_SECRET;
    return jwt.sign(values, privateKey, { expiresIn: '1 days' });
};
exports.signJwt = signJwt;
//# sourceMappingURL=jwt.js.map