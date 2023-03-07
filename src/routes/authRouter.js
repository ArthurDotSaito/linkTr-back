import { Router } from "express";
import signUpSchema from "../schemas/signUpSchema.js";
import { signUp } from "../controllers/authController.js";
import { validator, validateSchema } from "../middleware/validator.js";

const route = Router();

route.post("/signup", validateSchema(signUpSchema), signUp);

export default route;
