import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";

const url: string = process.env.DB_URL || ""
//console.log(process.env.DB_URL)

export const dbConnection = async () => {
  await mongoose.connect(url);
  console.log(`DataBase Is Connected On ${mongoose.connection.host}`);
};
