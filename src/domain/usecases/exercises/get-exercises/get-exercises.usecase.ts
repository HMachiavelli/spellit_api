import { GetExercisesInput } from "./get-exercises.dto";
import { AppContainer } from "infra/container";
import Exercise from "@/entities/exercise";
import { FindManyOptions } from "@/repositories/index";
import { Repository } from "domain/protocols/repository";

export default class GetExercises {
  private exerciseRepository: Repository;

  constructor(container: AppContainer) {
    this.exerciseRepository = container.exerciseRepository;
  }

  public async execute(input: GetExercisesInput) {
    const offset = input.page * input.page_size - input.page_size;

    const all: Exercise[] = await this.exerciseRepository.find({});

    const options: FindManyOptions = {
      search: input.search.trim(),
      limit: +(input.page_size || 10),
      offset: +offset,
      sortBy: input.sort_by.trim(),
      order: input.order.trim().toLowerCase(),
    };

    const list: Exercise[] = await this.exerciseRepository.find(options);
    const exerciseList = this.mapResponse(list);

    return {
      total: all.length,
      list: exerciseList,
    };
  }

  private mapResponse(list: Exercise[]): any {
    const response: any = [];
    list.map((item: Exercise) => {
      const exercise: any = {
        id: item.id,
        type: item.type,
        question: item.question,
        answer: item.answer,
        active: item.active,
        created_at: item.created_at,
        updated_at: item.updated_at,
        game: item.game,
        level: item.level,
        answer_type: item.answer_type,
      };

      if (item.game_exercise_results) {
        exercise.game_exercise_results = item.game_exercise_results;
      }

      if (item.question_media) {
        exercise.question_media = item.question_media;
      }

      response.push(exercise);
    });

    return response;
  }
}
