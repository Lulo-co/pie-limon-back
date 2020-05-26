import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";

import { FileInput } from "./file.dto";
import { Recipe } from "./recipe.model";
import { RecipeInput } from "./recipe.dto";
import { RecipesService } from "./recipes.service";

@Resolver()
export class RecipesResolver {
  constructor(private recipesService: RecipesService) { }

  @Query(() => [Recipe])
  async getRecipes() {
    return this.recipesService.findAll();
  }

  @Mutation(() => Recipe)
  async addRecipe(@Args('newRecipe') recipe: RecipeInput) {
    return this.recipesService.create(recipe);
  }

  @Mutation(() => Boolean)
  async attachRecipePhoto(
    @Args('file') file: FileInput,
    @Args('recipeId', { type: () => ID }) recipeId: number,
  ) {
    const fileContent = await file.file;
    return this.recipesService.attachPhoto(recipeId, fileContent);
  }
}
