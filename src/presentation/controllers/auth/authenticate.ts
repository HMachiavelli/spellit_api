import { Request, Response } from "express";
import { AppContainer } from "@/infra/container";
import {
  AuthenticateInput,
  AuthenticateOutput,
} from "@/usecases/auth/authenticate/authenticate.dto";
import Authenticate from "@/usecases/auth/authenticate/authenticate.usecase";
import { IBasicParser } from "@/infra/http/utils/basic-parser";

export class AuthenticateController {
  private readonly authenticate: Authenticate;
  private readonly basicParser: IBasicParser;

  constructor(container: AppContainer) {
    this.authenticate = container.authenticate;
    this.basicParser = container.basicParser;
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const { client_id, client_secret } = this.basicParser.parse(
      request.get("Authorization")
    );

    const input: AuthenticateInput = {
      client_id,
      client_secret,
      grant_type: request.body.grant_type || null,
    };

    const output: AuthenticateOutput = await this.authenticate.execute(input);

    return response.status(200).json(output);
  }
}
