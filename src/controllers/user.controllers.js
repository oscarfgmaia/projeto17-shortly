import userRepository from "../repositories/user.repository.js";
import bcrypt from "bcrypt";

export async function signUp(req, res) {
  const { name, email, password } = req.body;
  try {
    const hashPassword = bcrypt.hashSync(password,10)
    await userRepository.signUp(name, email, hashPassword);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getAllUsers(req, res) {
  try {
    const { rows } = await userRepository.getUsers();
    res.status(200).send(rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
