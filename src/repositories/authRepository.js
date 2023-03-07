import db from "../database/databaseConnection.js";

export function createUser(email, encryptedPassword, username, pictureUrl) {
  return db.query(
    `INSERT INTO users ("email", "password", "username", "icon") VALUES ($1, $2, $3, $4);`,
    [email, encryptedPassword, username, pictureUrl]
  );
}
