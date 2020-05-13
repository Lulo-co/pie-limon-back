import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import * as fs from "fs";

import { File } from "./file.model";
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

  @Mutation(() => File)
  async singleUpload(@Args('file') file: FileInput) {
    const { createReadStream, filename } = await file.file;
    const fileStream = createReadStream();
    fileStream.pipe(fs.createWriteStream(`./${filename}`));
    return file.file;
  }
}
