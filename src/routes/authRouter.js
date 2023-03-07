import { Router } from "express";
import signUpSchema from "../schemas/signUpSchema.js";
import signInSchema from "../schemas/signInSchema.js";
import { signUp, signIn } from "../controllers/authController.js";
import { validator, validateSchema } from "../middleware/validator.js";

const route = Router();

route.post("/signup", validateSchema(signUpSchema), signUp);
route.post("/signin", validateSchema(signInSchema), signIn);

export default route;
