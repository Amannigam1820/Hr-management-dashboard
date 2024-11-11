import dotenv from 'dotenv';
import cloudinary from "cloudinary"
import fileUpload from "express-fileupload";


dotenv.config();
import express from "express";
import { dbConnection } from "./utils/db.js";
import cookieParser from "cookie-parser";
import HrRouter from "./routes/hrRoute.js";
import EmployeeRouter from "./routes/employeeRoute.js"

const app = express();
const port: string = process.env.PORT || "3060"
console.log(process.env.PORT);


cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME, 
  api_key: process.env.CLOUDINARY_CLIENT_API_KEY, 
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET  
})


dbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size if needed
  useTempFiles: true, // If needed for larger files
  tempFileDir: '/tmp/' // Temporary directory for file storage
}));

app.use("/api/v1/hr", HrRouter);
app.use("/api/v1/employee",EmployeeRouter)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
