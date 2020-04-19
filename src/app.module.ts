import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as PostgressConnectionStringParser from 'pg-connection-string';

import { RecipesModule } from './recipes/recipes.module';

const dbOptions: TypeOrmModuleAsyncOptions = {
  useFactory: () => {
    const connectionOptions = PostgressConnectionStringParser.parse(process.env.DATABASE_URL);
    return {
      type: 'postgres',
      host: connectionOptions.host,
      port: parseInt(connectionOptions.port) || 5432,
      username: connectionOptions.user,
      password: connectionOptions.password,
      database: connectionOptions.database,
      autoLoadEntities: true,
      synchronize: true
    }
  }
};

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({ autoSchemaFile: join(process.cwd(), 'src/schema.gql') }),
    TypeOrmModule.forRootAsync(dbOptions),
    RecipesModule,
  ],
})
export class AppModule { }
