import {
  loginUser,
  createUser,
  userExists,
  sessionToken,
  deleteToken,
} from "../repositories/authRepository.js";
import bcrypt from "bcrypt";
import uuidV4 from "uuid4";

export async function signUp(req, res) {
  const { email, password, username, pictureUrl } = req.body;
  const encryptedPassword = bcrypt.hashSync(password, 10);

  try {
    const user = await userExists(email);

    if (user.rowCount > 0) {
      return res.status(409).send("This e-mail is already registered!");
    }

    await createUser(email, encryptedPassword, username, pictureUrl);

    return res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  const token = uuidV4();

  try {
    const user = await userExists(email);
    if (
      user.rowCount === 0 ||
      !bcrypt.compareSync(password, user.rows[0].password)
    ) {
      return res.status(401).send("Email or password are invalid!");
    }

    await loginUser(token, user.rows[0].id);

    res.status(200).send({ token: token });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function logout(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  try {
    const session = await sessionToken(token);

    if (session.rowCount === 0) {
      return res.sendStatus(401);
    }

    await deleteToken(token);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
