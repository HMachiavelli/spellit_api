import { Request, Response } from "express";
import { UnauthorizedError } from "@/errors/UnauthorizedError";

export default (request: Request, response: Response, next: any) => {
  const isAdmin = request.user.role && request.user.role === "admin";

  if (!isAdmin) {
    throw new UnauthorizedError("Unauthorized");
  }

  next();
};
