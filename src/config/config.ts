export default {
  jwtScret: process.env.JWT_SECRET || "secret-token",
  DB: {
    URI: process.env.MONGODB_URI || "mongodb://25.18.3.25:27037,25.76.2.217:27060/api",
    USER: process.env.MONGODB_USER || "",
    PASSWORD: process.env.MONGODB_PASSWORD || "",
  },
};
