import { Request, Response } from "express";
import { UnauthorizedException } from "@/presentation/exceptions/unauthorized";

export default (request: Request, response: Response, next: any) => {
  const isAdmin = request.user.role && request.user.role === "admin";

  if (!isAdmin) {
    throw new UnauthorizedException("Unauthorized");
  }

  next();
};
