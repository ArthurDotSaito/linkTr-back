import express from "express";
import dotenv from "dotenv";
import router from "./routes/routes.js";

dotenv.config();

const app = express();
app.use(router)

app.listen(port, (error) =>{
    if(error) return console.log("Unable to listen server");
    console.log(`server is running on port ${port}`);
})