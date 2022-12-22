import Joi from "joi";
const userSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword:Joi.string().min(6).required(),
});
export default userSchema;
