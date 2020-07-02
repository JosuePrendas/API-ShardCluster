import { Request, Response } from "express";
import Product from "../models/product";
import Zone from "../models/zone";
import { verifyIdToken } from "../controllers/user.controller";

export const addProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let tokenValid = await verifyIdToken(req, res);
  if (!tokenValid) return res.status(400).json({ msg: "Unauthorized" });

  if (!req.body.producto || !req.body.productor || !req.body.zona)
    return res.status(400).json({ msg: "Please. Send all the information" });

  const product = await Product.findOne({ producto: req.body.producto });
  if (product) {
    return res.status(400).json({ msg: "The product already exists" });
  }

  const searchedZone = await Zone.findOne({ nombre: req.body.zona });
  if (!searchedZone) {
    return res.status(400).json({ msg: "The zone does not exists" });
  }

  const newProduct = new Product(req.body);
  await newProduct.save();

  return res.status(201).json(newProduct);
};

export const productsListPerZone = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let tokenValid = await verifyIdToken(req, res);
  if (!tokenValid) return res.status(400).json({ msg: "Unauthorized" });

  if (!req.body.lat || !req.body.long)
    return res.status(400).json({ msg: "Please. Send lat and Long data" });

  //Cambiar el query para buscar lat entre minLat y maxLat && long entre minLong y maxLong
  const searchedZone = await Zone.findOne({
    minLat: { $lte: req.body.lat },
    maxLat: { $gte: req.body.lat },
    minLong: { $lte: req.body.long },
    maxLong: { $gte: req.body.long },
  });

  if (!searchedZone) {
    return res.status(400).json({ msg: "The zone does not exists" });
  }

  const productsList = await Product.find({ zona: searchedZone.nombre });
  return res.status(400).json({ products: productsList });
};

export const productsList = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let tokenValid = await verifyIdToken(req, res);
  if (!tokenValid) return res.status(400).json({ msg: "Unauthorized" });

  const productsList = await Product.find({});
  return res.status(400).json({ products: productsList });
};
