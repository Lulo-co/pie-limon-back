import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Recipe } from './recipe.entity';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';
import { UploadScalar } from './upload.scalar';
import { Photo } from './photo.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, Photo]), AuthModule],
  providers: [RecipesResolver, RecipesService, UploadScalar],
})
export class RecipesModule {}
