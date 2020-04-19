import { Resolver, Query } from "@nestjs/graphql";

import { Recipe } from "./recipe.model";
import { RecipesService, IRecipe } from "./recipes.service";

@Resolver()
export class RecipesResolver {
  constructor(private recipesService: RecipesService) { }

  @Query(returns => [Recipe])
  async getRecipes(): Promise<IRecipe[]> {
    return this.recipesService.findAll();
  }

}
