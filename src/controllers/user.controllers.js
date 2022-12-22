import { connectionDb } from "../database/database.js";

export async function createUser(req, res) {
  const { name, email, password } = req.body;
  try {
    await connectionDb.query(
      `
        INSERT INTO users (name,email,password)
        VALUES ($1,$2,$3)
    `,
      [name, email, password]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
