import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GoogleDriveService } from 'src/third-party-services/google-drive.service';
import { Recipe } from './recipe.entity';
import { RecipeInput, EditRecipeInput, RecipeOutput } from './recipe.dto';
import { Photo } from './photo.entity';
import { Upload } from './upload.scalar';

@Injectable()
export class RecipesService {
  private readonly logger = new Logger(RecipesService.name);

  constructor(
    @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
    @InjectRepository(Photo) private photoRepository: Repository<Photo>,
    private gDriveService: GoogleDriveService,
  ) {}

  async findAll(): Promise<RecipeOutput[]> {
    return (
      await this.recipeRepository.find({
        relations: ['photos'],
        order: { name: 'ASC' },
      })
    ).map(recipe => ({
      ...recipe,
      num_photos: recipe.photos.length,
    }));
  }

  findOne(recipeId: number): Promise<Recipe | undefined> {
    return this.recipeRepository.findOne(recipeId, { relations: ['photos'] });
  }

  async create(recipe: RecipeInput): Promise<Recipe> {
    const entity = new Recipe();
    entity.name = recipe.name;
    return this.recipeRepository.save(entity);
  }

  async edit(recipe: EditRecipeInput): Promise<Recipe> {
    const entity = await this.recipeRepository.findOne(recipe.id);
    entity.description = recipe.description;
    return this.recipeRepository.save(entity);
  }

  async attachPhoto(recipeId: number, file: Upload): Promise<boolean> {
    try {
      const recipe = await this.recipeRepository.findOne(recipeId);
      if (!recipe) throw new Error("recipe doesn't exist");

      const { createReadStream, filename, mimetype } = file;
      const url = await this.gDriveService.createFile(
        filename,
        mimetype,
        createReadStream(),
      );

      const entity = this.photoRepository.create({ recipe, url });
      await this.photoRepository.save(entity);
      return true;
    } catch (err) {
      this.logger.error(err.message, err.stack);
      return false;
    }
  }

  async deletePhoto(url: string): Promise<boolean> {
    try {
      await this.gDriveService.deleteFile(url);
      await this.photoRepository.delete({ url });
      return true;
    } catch (err) {
      this.logger.error(err.message, err.stack);
      return false;
    }
  }

  async deleteRecipe(id: number): Promise<boolean> {
    try {
      const recipe = await this.recipeRepository.findOne(id, {
        relations: ['photos'],
      });
      if (!recipe) throw new Error('Receta no encontrada');
      recipe.photos.forEach(async photo => {
        await this.deletePhoto(photo.url);
      });
      await this.recipeRepository.delete({ id });
      return true;
    } catch (err) {
      this.logger.error(err.message, err.stack);
      return false;
    }
  }
}
