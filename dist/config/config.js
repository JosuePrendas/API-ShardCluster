"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    jwtScret: process.env.JWT_SECRET || "secret-token",
    DB: {
        URI: process.env.MONGODB_URI || "mongodb://25.18.3.25:27037/productos",
        USER: process.env.MONGODB_USER || "",
        PASSWORD: process.env.MONGODB_PASSWORD || "",
    },
};
