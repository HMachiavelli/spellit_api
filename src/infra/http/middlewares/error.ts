import { UnauthorizedError } from "@/errors/UnauthorizedError";

export default (err: any, req: any, res: any, next: any) => {
  let code = 500;
  if (err instanceof UnauthorizedError) {
    code = 401;
  }

  res.status(code).send({
    message: err.message,
  });
};
