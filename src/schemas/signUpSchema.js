import joi from "joi";

const signUpSchema = joi.object({
  email: joi.string().min(1).email().required(),
  username: joi.string().min(1).required(),
  password: joi.string().min(1).required(),
  pictureUrl: joi.string().uri().required(),
});

export default signUpSchema;
