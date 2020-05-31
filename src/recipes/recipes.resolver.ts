import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';

import { FileInput } from './file.dto';
import { Recipe } from './recipe.model';
import { Recipe as RecipeEntity } from './recipe.entity';
import { RecipeInput } from './recipe.dto';
import { RecipesService } from './recipes.service';

@Resolver()
export class RecipesResolver {
  constructor(private recipesService: RecipesService) { }

  @Query(() => [Recipe])
  async getRecipes(): Promise<RecipeEntity[]> {
    return this.recipesService.findAll();
  }

  @Query(() => Recipe)
  async getRecipe(
    @Args('recipeId', { type: () => ID }) recipeId: number,
  ): Promise<RecipeEntity> {
    return this.recipesService.findOne(recipeId);
  }

  @Mutation(() => Recipe)
  async addRecipe(@Args('newRecipe') recipe: RecipeInput): Promise<RecipeEntity> {
    return this.recipesService.create(recipe);
  }

  @Mutation(() => Boolean)
  async attachRecipePhoto(
    @Args('file') file: FileInput,
    @Args('recipeId', { type: () => ID }) recipeId: number,
  ): Promise<boolean> {
    const fileContent = await file.file;
    return this.recipesService.attachPhoto(recipeId, fileContent);
  }
}
