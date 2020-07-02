import { Router } from "express";
import {
  addProduct,
  productsList,
  productsListPerZone,
} from "../controllers/product.controller";
import { users } from "../controllers/user.controller";
import { addZone, zones } from "../controllers/zone.controller";

const router = Router();

router.get("/special");
router.get("/users", users);
router.post("/addProduct", addProduct);
router.get("/products", productsList);
router.get("/productsPerZone", productsListPerZone);
router.post("/addZone", addZone);
router.get("/Zones", zones);

export default router;
