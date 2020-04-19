import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';

import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [
    GraphQLModule.forRoot({ autoSchemaFile: join(process.cwd(), 'src/schema.gql') }),
    RecipesModule,
  ],
})
export class AppModule { }
