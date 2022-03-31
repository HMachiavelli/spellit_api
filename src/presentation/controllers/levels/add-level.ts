import { Request, Response } from 'express';
import { AddLevelInput, AddLevelOutput } from '@/usecases/levels/add-level/add-level.dto';
import AddLevel from '@/usecases/levels/add-level/add-level.usecase';

export class AddLevelController {
  constructor(
    private readonly validation: any,
    private readonly addLevel: AddLevel
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input: AddLevelInput = request.body;

      const error = this.validation.validate(input);
      if (error) {
        return response.status(400).json(error);
      }

      const output: AddLevelOutput = await this.addLevel.execute(input);

      return response.status(200).json(output);
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}