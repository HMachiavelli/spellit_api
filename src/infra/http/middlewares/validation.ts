import { Request } from "express";
import { ObjectSchema } from "joi";

export const validate = async (
  schemaName: string,
  req: Request,
  res: any,
  next: any
) => {
  const schema: ObjectSchema = (await import(`@/infra/schema/${schemaName}`))
    .default;

  if (!schema) {
    res.status(400).json({ message: "Schema not found" });
  }

  try {
    const value = await schema.validateAsync(req.body);
    console.log(value);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }

  next();
};
