import { Request, Response } from "express";
import Zone from "../models/zone";
import jwt from "jsonwebtoken";
import config from "../config/config";

export const addZone = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (
    !req.body.nombre ||
    !req.body.minLat ||
    !req.body.maxLat ||
    !req.body.minLong ||
    !req.body.maxLong
  )
    return res.status(400).json({ msg: "Error. Information Incomplete" });

  const zone = await Zone.findOne({ nombre: req.body.nombre });
  if (zone) {
    return res.status(400).json({ msg: "The zone already exists" });
  }

  const newZone = new Zone(req.body);
  await newZone.save();

  return res.status(201).json(newZone);
};

export const zones = async (req: Request, res: Response): Promise<Response> => {
  console.log(req.headers.authorization);
  const zonelist = await Zone.find();
  return res.status(400).json({ msg: zonelist });
};
