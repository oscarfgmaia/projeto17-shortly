import userRepository from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
  const { name, email, password } = req.body;
  try {
    const hashPassword = bcrypt.hashSync(password, 10);
    await userRepository.signUp(name, email, hashPassword);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  try {
    const { password } = req.body;
    const userFound = res.locals.user;
    const hashPassword = userFound.rows[0].password;
    if (bcrypt.compareSync(password, hashPassword)) {
      const token = uuid();
      res.status(200).send(token);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
