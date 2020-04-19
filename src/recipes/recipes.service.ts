import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Recipe as RecipeEntity } from './recipe.entity';
import { Recipe } from './recipe.model';
import { RecipeInput } from './recipe.dto';

@Injectable()
export class RecipesService {
  constructor(@InjectRepository(RecipeEntity) private recipeRepository: Repository<RecipeEntity>) { }

  async findAll(): Promise<Recipe[]> {
    return this.recipeRepository.find();
  }

  async create(recipe: RecipeInput): Promise<Recipe> {
    const entity = new RecipeEntity();
    entity.name = recipe.name;
    return this.recipeRepository.save(entity);
  }
}
