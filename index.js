import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoConfig from "./config/mongoConfig.js";
import userRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
const application = express();
dotenv.config();
application.use(express.json());
mongoConfig();

application.use("/api/user", cors(), userRoute);
application.use("/api/category", cors(), categoryRoute);
application.use("/api/product", cors(), productRoute);

const PORT = process.env.PORT || 4000;
application.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})