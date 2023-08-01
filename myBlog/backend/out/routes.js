"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const AccountRoute_1 = require("./src/routes/AccountRoute");
const router = express.Router();
router.use('/', AccountRoute_1.default);
exports.default = router;
//# sourceMappingURL=routes.js.map