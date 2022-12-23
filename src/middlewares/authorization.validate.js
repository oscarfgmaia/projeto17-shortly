import userRepository from "../repositories/user.repository.js";

export default async function authorizationValidate(req, res, next) {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) {
      return res.sendStatus(401);
    }
    const user = await userRepository.getUserByToken(token);
    if (user.rowCount === 0) {
      return res.sendStatus(401);
    }
    res.locals.user = user.rows[0];
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}