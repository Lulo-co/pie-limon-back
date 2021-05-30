import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { FileInput } from './file.dto';
import { GoogleAuthGuard } from '../common/guards/google-auth.guard';
import { Recipe } from './recipe.model';
import { Recipe as RecipeEntity } from './recipe.entity';
import { RecipeInput, EditRecipeInput, RecipeOutput } from './recipe.dto';
import { RecipesService } from './recipes.service';

@UseGuards(GoogleAuthGuard)
@Resolver()
export class RecipesResolver {
  constructor(private recipesService: RecipesService) {}

  @Query(() => [Recipe])
  async getRecipes(): Promise<RecipeOutput[]> {
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

  @Mutation(() => Recipe)
  async editRecipe(
    @Args('recipe') recipe: EditRecipeInput,
  ): Promise<RecipeEntity> {
    return this.recipesService.edit(recipe);
  }

  @Mutation(() => Boolean)
  async attachRecipePhoto(
    @Args('file') file: FileInput,
    @Args('recipeId', { type: () => ID }) recipeId: number,
  ): Promise<boolean> {
    const fileContent = await file.file;
    return this.recipesService.attachPhoto(recipeId, fileContent);
  }

  @Mutation(() => Boolean)
  async deleteRecipePhoto(@Args('url') url: string): Promise<boolean> {
    return this.recipesService.deletePhoto(url);
  }

  @Mutation(() => Boolean)
  async deleteRecipe(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<boolean> {
    return this.recipesService.deleteRecipe(id);
  }
}
