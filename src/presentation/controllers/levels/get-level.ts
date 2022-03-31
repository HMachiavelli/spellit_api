import { Request, Response } from 'express';

export class GetLevelController {
  constructor(
    private readonly validation: any,
    private readonly addSurvey: any
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      // const error = this.validation.validate(request)
      // if (error) {
      //   return badRequest(error)
      // }

      // await this.addSurvey.add({
      //   ...request,
      //   date: new Date()
      // });

      return response.status(200).json({});
    } catch (error) {
      // return serverError(error)
    }
  }
}