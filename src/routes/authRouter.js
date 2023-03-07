import { Router } from "express";
import signUpSchema from "../schemas/signUpSchema.js";
import { signUp } from "../controllers/authController.js";
import { validator } from "../middleware/validator.js";

const route = Router();

route.post("/signup", validator(signUpSchema), signUp);

export default route;
