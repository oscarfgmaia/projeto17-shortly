import userRepository from "../repositories/user.repository.js";
import userSchema from "../schemas/user.schema.js";

export default async function userValidate(req, res, next) {
  try {
    const { error } = userSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
    if (req.body.password != req.body.confirmPassword) {
      return res.status(422).send("password must be the same");
    }

    const emailExists = await userRepository.checkEmailExists(req.body.email);
    if (emailExists.rowCount > 0) {
      return res.sendStatus(409);
    }

    const nameExists = await userRepository.checkNameExists(req.body.name);
    if (nameExists.rowCount > 0) {
      return res.sendStatus(409);
    }
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
