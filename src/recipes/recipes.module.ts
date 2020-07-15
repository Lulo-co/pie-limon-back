import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Recipe } from './recipe.entity';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';
import { UploadScalar } from './upload.scalar';
import { Photo } from './photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, Photo])],
  providers: [RecipesResolver, RecipesService, UploadScalar],
})
export class RecipesModule {}
