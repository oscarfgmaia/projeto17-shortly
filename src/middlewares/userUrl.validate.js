import userRepository from "../repositories/user.repository.js";
import urlSchema from "../schemas/url.schema.js";

export default async function urlValidate(req, res, next) {
  try {
    const { error } = urlSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
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
