import { model, Schema, Document } from "mongoose";

export interface IZone extends Document {
  nombre: String;
  minLat: Number;
  maxLat: Number;
  minLong: Number;
  maxLong: Number;
}

const zoneSchema = new Schema({
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

export default model<IZone>("zone", zoneSchema);
