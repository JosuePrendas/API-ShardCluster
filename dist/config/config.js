"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    jwtScret: process.env.JWT_SECRET || "secret-token",
    DB: {
        URI: process.env.MONGODB_URI || "mongodb://25.76.2.217:27060, 25.18.3.25:27037/api",
        USER: process.env.MONGODB_USER || "",
        PASSWORD: process.env.MONGODB_PASSWORD || "",
    },
};
