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
exports.productsList = exports.productsListPerZone = exports.addProduct = void 0;
const product_1 = __importDefault(require("../models/product"));
const zone_1 = __importDefault(require("../models/zone"));
exports.addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.producto || !req.body.productor || !req.body.zona)
        return res.status(400).json({ msg: "Please. Send all the information" });
    const product = yield product_1.default.findOne({ producto: req.body.producto });
    if (product) {
        return res.status(400).json({ msg: "The product already exists" });
    }
    const searchedZone = yield zone_1.default.findOne({ nombre: req.body.zona });
    if (!searchedZone) {
        return res.status(400).json({ msg: "The zone does not exists" });
    }
    const newProduct = new product_1.default(req.body);
    yield newProduct.save();
    return res.status(201).json(newProduct);
});
exports.productsListPerZone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.lat || !req.body.long)
        return res.status(400).json({ msg: "Please. Send lat and Long data" });
    //Cambiar el query para buscar lat entre minLat y maxLat && long entre minLong y maxLong
    const searchedZone = yield zone_1.default.findOne({
        minLat: { $lte: req.body.lat },
        maxLat: { $gte: req.body.lat },
        minLong: { $lte: req.body.long },
        maxLong: { $gte: req.body.long },
    });
    if (!searchedZone) {
        return res.status(400).json({ msg: "The zone does not exists" });
    }
    const productsList = yield product_1.default.find({ zona: searchedZone.nombre });
    return res.status(400).json({ products: productsList });
});
exports.productsList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productsList = yield product_1.default.find({});
    return res.status(400).json({ products: productsList });
});
