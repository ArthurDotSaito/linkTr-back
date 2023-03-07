import express from "express";
import dotenv from "dotenv";
import router from "./routes/routes.js";

dotenv.config();

const app = express();
app.use(router)

app.listen(process.env.PORT, () => {
  console.log(`Server is running; PORT: ${process.env.PORT}`);
});
