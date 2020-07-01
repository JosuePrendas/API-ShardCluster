import { Router } from "express";
import passport from "passport";
import {
  addProduct,
  productsList,
  productsListPerZone,
} from "../controllers/product.controller";
import { users, verifyIdToken } from "../controllers/user.controller";
import { addZone, zones } from "../controllers/zone.controller";

const router = Router();

router.get(
  "/special",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("success");
  }
);
router.get(
  "/users", 
  passport.authenticate("jwt", { session: false }), 
  users);
router.post(
  "/addProduct",
  passport.authenticate("jwt", { session: false }),
  addProduct
);
router.get(
  "/products",
  passport.authenticate("jwt", { session: false }),
  productsList
);
router.get(
  "/productsPerZone",
  passport.authenticate("jwt", { session: false }),
  productsListPerZone
);
router.post(
  "/addZone",
  passport.authenticate("jwt", { session: false }),
  addZone
);
router.get(
  "/Zones", 
  verifyIdToken, 
  zones
);

export default router;
