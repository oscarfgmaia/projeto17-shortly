import userRepository from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { nanoid } from "nanoid";

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
    const userId = userFound.rows[0].id;
    if (bcrypt.compareSync(password, hashPassword)) {
      const token = uuid();
      await userRepository.startSession(userId, token);
      res.status(200).send(token);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function shortenUrl(req, res) {
  try {
    const user = res.locals.user;
    const userId = user.id;
    const { url } = req.body;
    const shortUrl = nanoid(8);
    await userRepository.insertUrls(userId, url, shortUrl);
    const responseObj = {
      shortUrl: shortUrl,
    };
    res.status(201).send(responseObj);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
