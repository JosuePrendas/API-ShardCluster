import { model, Schema, Document } from "mongoose";

export interface IProduct extends Document {
  producto: String;
  productor: String;
  zona: String;
}

const productSchema = new Schema({
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

export default model<IProduct>("product", productSchema);
