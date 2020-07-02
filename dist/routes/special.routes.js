"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const product_controller_1 = require("../controllers/product.controller");
const user_controller_1 = require("../controllers/user.controller");
const zone_controller_1 = require("../controllers/zone.controller");
const router = express_1.Router();
router.get("/special", passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    res.send("success");
});
router.get("/users", passport_1.default.authenticate("jwt", { session: false }), user_controller_1.users);
router.post("/addProduct", passport_1.default.authenticate("jwt", { session: false }), product_controller_1.addProduct);
router.get("/products", passport_1.default.authenticate("jwt", { session: false }), product_controller_1.productsList);
router.get("/productsPerZone", passport_1.default.authenticate("jwt", { session: false }), product_controller_1.productsListPerZone);
router.post("/addZone", passport_1.default.authenticate("jwt", { session: false }), zone_controller_1.addZone);
router.get("/Zones", user_controller_1.verifyIdToken, zone_controller_1.zones);
exports.default = router;
