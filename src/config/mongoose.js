/* eslint-disable no-console */
// DevT | example mongodb file
import mongoose from "mongoose";

let dbEcommercePerfumeInstance = null;

export const CONNECT_DB = async () => {
  dbEcommercePerfumeInstance = await mongoose.connect(
    "mongodb+srv://devt:878645436TaiLee!@changelink.4szur.mongodb.net/ChangeLink?retryWrites=true&w=majority",
    {
      dbName: "winDatabase",
    }
  );
};

export const CLOSE_DB = async () => {
  await dbEcommercePerfumeInstance.disconnect();
};
