import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GoogleDriveService } from 'src/third-party-services/google-drive.service';
import { Recipe as RecipeEntity } from './recipe.entity';
import { Recipe } from './recipe.model';
import { RecipeInput } from './recipe.dto';
import { Photo as PhotoEntity } from './photo.entity';
import { Upload } from './upload.scalar';

@Injectable()
export class RecipesService {
  private readonly logger = new Logger(RecipesService.name);

  constructor(
    @InjectRepository(RecipeEntity) private recipeRepository: Repository<RecipeEntity>,
    @InjectRepository(PhotoEntity) private photoRepository: Repository<PhotoEntity>,
    private gDriveService: GoogleDriveService,
  ) { }

  async findAll(): Promise<Recipe[]> {
    return this.recipeRepository.find();
  }

  async create(recipe: RecipeInput): Promise<Recipe> {
    const entity = new RecipeEntity();
    entity.name = recipe.name;
    return this.recipeRepository.save(entity);
  }

  async attachPhoto(recipeId: number, file: Upload): Promise<boolean> {
    try {
      const recipe = await this.recipeRepository.findOne(recipeId);
      if (!recipe) throw new Error('recipe doesn\'t exist')

      const { createReadStream, filename, mimetype } = file;
      const url = await this.gDriveService.createFile(filename, mimetype, createReadStream());

      const entity = this.photoRepository.create({ recipe, url });
      await this.photoRepository.save(entity);
      return true;
    } catch (err) {
      this.logger.error(err.message, err.stack)
      return false;
    }
  }
}
