import app from "./app";
import "./database";

async function main() {
  await app.listen(app.get("port"));
  console.log("Listening on port", app.get("port"));
}

main();
