import userRepository from "../repositories/user.repository.js";

export async function createUser(req, res) {
  const { name, email, password } = req.body;
  try {
    await userRepository.createUser(name, email, password);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getAllUsers(req, res) {
    try {
      const {rows} = await userRepository.getUsers();
      res.status(200).send(rows)
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }