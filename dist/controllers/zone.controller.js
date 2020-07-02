"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zones = exports.addZone = void 0;
const zone_1 = __importDefault(require("../models/zone"));
exports.addZone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.nombre ||
        !req.body.minLat ||
        !req.body.maxLat ||
        !req.body.minLong ||
        !req.body.maxLong)
        return res.status(400).json({ msg: "Error. Information Incomplete" });
    const zone = yield zone_1.default.findOne({ nombre: req.body.nombre });
    if (zone) {
        return res.status(400).json({ msg: "The zone already exists" });
    }
    const newZone = new zone_1.default(req.body);
    yield newZone.save();
    return res.status(201).json(newZone);
});
exports.zones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.headers.authorization);
    const zonelist = yield zone_1.default.find();
    return res.status(400).json({ msg: zonelist });
});
