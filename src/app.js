<<<<<<< HEAD
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import timelineRoutes from './routes/timeline.routes.js';
import route from './routes/authRouter.js';
import userSearch from './routes/searchUsersRouter.js';
import likesRoutes from './routes/likesRouter.js';
import commentRoute from './routes/commentsRouter.js';
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(timelineRoutes);
app.use(route);
app.use(userSearch)
app.use(likesRoutes);
app.use(commentRoute);
app.use(router)

app.listen(port, (error) => {
  if (error) return console.log("Unable to listen server");
  console.log(`server is running on port ${port}`);
});
