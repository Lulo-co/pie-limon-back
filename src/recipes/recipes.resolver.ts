import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { FileInput } from './file.dto';
import { Recipe } from './recipe.model';
import { Recipe as RecipeEntity } from './recipe.entity';
import { RecipeInput } from './recipe.dto';
import { RecipesService } from './recipes.service';
import { GoogleAuthGuard } from '../auth/google-auth.guard';

@UseGuards(GoogleAuthGuard)
@Resolver()
export class RecipesResolver {
  constructor(private recipesService: RecipesService) {}

  @Query(() => [Recipe])
  async getRecipes(): Promise<RecipeEntity[]> {
    return this.recipesService.findAll();
  }

  @Query(() => Recipe)
  async getRecipe(
    @Args('recipeId', { type: () => ID }) recipeId: number,
  ): Promise<RecipeEntity> {
    const recipe = await this.recipesService.findOne(recipeId);
    if (!recipe) throw new Error('Receta no encontrada');
    return recipe;
  }

  @Mutation(() => Recipe)
  async addRecipe(
    @Args('newRecipe') recipe: RecipeInput,
  ): Promise<RecipeEntity> {
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
