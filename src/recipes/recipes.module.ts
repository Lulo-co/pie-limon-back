import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Recipe } from './recipe.entity';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';
import { UploadScalar } from './upload.scalar';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe])],
  providers: [RecipesResolver, RecipesService, UploadScalar]
})
export class RecipesModule { }
