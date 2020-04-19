import { Injectable } from '@nestjs/common';

export interface IRecipe {
  id: number;
  name: string;
}

@Injectable()
export class RecipesService {
  private readonly recipes: IRecipe[] = [];

  async findAll(): Promise<IRecipe[]> {
    return this.recipes;
  }
}
