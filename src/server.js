/* eslint-disable no-console */
import exitHook from "async-exit-hook";
import * as bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import { APIsV1 } from "~/routes/v1";
import { corsOptions } from "./config/cors";
import { CLOSE_DB, CONNECT_DB } from "./config/mongoose";
import { errorHandlingMiddleware } from "./middlewares/errorHandlingMiddleware";

const START_SERVER = () => {
  const app = express();

  let PORT = 11118;

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.use("/api/v1", APIsV1);
  app.use(errorHandlingMiddleware);

  app.listen(PORT, () => {
    console.log("[INFO] 👉", `Server is running on port ${PORT} ✅`);
  });

  exitHook(() => {
    CLOSE_DB();
    console.log("[INFO] 👉", "Disconnected MongoDB");
    console.log("[INFO] 👉", "Exit App");
  });
};

(async () => {
  try {
    console.log("[INFO] 👉", "Connecting to MongoDB... ⌛");
    await CONNECT_DB();
    console.log("[INFO] 👉", "Connected successfully MongoDB ✅");
    START_SERVER();
  } catch (error) {
    console.log("[ERROR] 👉", `${error} ❌`);
    process.exit(0);
  }
})();
