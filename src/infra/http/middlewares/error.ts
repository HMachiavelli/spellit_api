import { UnauthorizedError } from "@/errors/UnauthorizedError";
import { NotFoundError } from "@/errors/NotFoundError";

export default (err: any, req: any, res: any, next: any) => {
  let code = 500;
  if (err instanceof UnauthorizedError) {
    code = 401;
  }

  if (err instanceof NotFoundError) {
    code = 404;
  }

  res.status(code).send({
    message: err.message,
  });
};
