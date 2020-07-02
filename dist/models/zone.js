"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const zoneSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        unique: true,
        require: true,
        lowercase: true,
        trim: true,
    },
    minLat: {
        type: Number,
        require: true,
    },
    maxLat: {
        type: Number,
        required: true,
    },
    minLong: {
        type: Number,
        require: true,
    },
    maxLong: {
        type: Number,
        require: true,
    },
});
exports.default = mongoose_1.model("zone", zoneSchema);
