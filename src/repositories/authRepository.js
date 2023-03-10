import db from "../database/databaseConnection.js";

export function createUser(email, encryptedPassword, username, pictureUrl) {
  return db.query(
    `INSERT INTO users ("email", "password", "username", "icon") VALUES ($1, $2, $3, $4);`,
    [email, encryptedPassword, username, pictureUrl]
  );
}

export async function userExists(email) {
  return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
}

export function loginUser(token, userId) {
  return db.query(`INSERT INTO sessions (token,"userId") VALUES ($1, $2)`, [
    token,
    userId,
  ]);
}

export async function sessionToken(token) {
  return db.query(`SELECT * FROM sessions WHERE token = $1`, [token]);
}

export async function deleteToken(token) {
  return db.query(`DELETE FROM sessions WHERE token = $1`, [token]);
}
