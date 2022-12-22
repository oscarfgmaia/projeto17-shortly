import userRepository from "../repositories/user.repository.js";
import loginSchema from "../schemas/login.schema.js";

export default async function loginValidate(req, res, next) {
  try {
    const { error } = loginSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }

    const emailExists = await userRepository.checkEmailExists(req.body.email);
    if (emailExists.rowCount === 0) {
      return res.sendStatus(401);
    }
    res.locals.user = emailExists;
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
