"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    producto: {
        type: String,
        unique: true,
        require: true,
        lowercase: true,
    },
    productor: {
        type: String,
        require: true,
    },
    zona: {
        type: String,
        required: true,
        lowercase: true,
    },
});
exports.default = mongoose_1.model("product", productSchema);
