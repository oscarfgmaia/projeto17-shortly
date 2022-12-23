import urlSchema from "../schemas/url.schema.js";

export default async function urlSchemaValidate(req, res, next) {
  try {
    const { error } = urlSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}