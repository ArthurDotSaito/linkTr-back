import { createUser } from "../repositories/authRepository.js";
import bcrypt from "bcrypt";

export async function signUp(req, res) {
  const { email, password, username, pictureUrl } = req.body;
  const encryptedPassword = bcrypt.hashSync(password, 10);

  try {
    await createUser(email, encryptedPassword, username, pictureUrl);

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
