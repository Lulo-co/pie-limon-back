import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";

import { Recipe } from "./recipe.model";
import { RecipesService } from "./recipes.service";
import { RecipeInput } from "./recipe.dto";

@Resolver()
export class RecipesResolver {
  constructor(private recipesService: RecipesService) { }

  @Query(returns => [Recipe])
  async getRecipes() {
    return this.recipesService.findAll();
  }

  @Mutation(returns => Recipe)
  async addRecipe(@Args('newRecipe') recipe: RecipeInput) {
    return this.recipesService.create(recipe);
  }

}
