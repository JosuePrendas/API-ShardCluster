import mongoose, { ConnectionOptions } from "mongoose";
import config from "./config/config";

const params: ConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.connect(config.DB.URI, params);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Status: connection stablished");
});

connection.on("error", (err) => {
  console.log(err);
  process.exit(0);
});
