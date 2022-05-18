import { UnauthorizedException } from "@/presentation/exceptions/unauthorized";
import { NotFoundException } from "@/presentation/exceptions/not-found";

export default (err: any, req: any, res: any, next: any) => {
  let code = 500;
  if (err instanceof UnauthorizedException) {
    code = 401;
  }

  if (err instanceof NotFoundException) {
    code = 404;
  }

  res.status(code).send({
    message: err.message,
  });
};
