import mongoose, { ConnectionOptions } from "mongoose";
import config from "./config/config";

const params: ConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
};

let serverString: Array<string> = ['25.76.2.217:27060', '25.18.3.25:27037'];

function Tryconnect(route : string) {
  mongoose.connect(route, params);

  mongoose.connection.once("open", () => {
    console.log("Status: connection stablished");
  });
  
  mongoose.connection.on("error", (err) => {
    console.log(err); 
    process.exit(0);
  });
}

for (let index = 0; index < serverString.length; index++) {
  try {
    console.log( "Over here!" );
    Tryconnect("mongodb://"+serverString[index]+"/api");
    break;
  } catch (error) {
    console.log( "Changing router, wait a moment" );
  }
}

// mongoose.connect(config.DB.URI, params);

/* const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Status: connection stablished");
});

connection.on("error", (err) => {
  console.log(err);
  process.exit(0);
}); */