import Joi from "joi";

export default Joi.object({
  title: Joi.string().min(1).required(),
});
