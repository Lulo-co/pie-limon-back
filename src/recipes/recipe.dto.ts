import { InputType, Field, ID } from '@nestjs/graphql';
import { Recipe } from './recipe.entity';

@InputType({ description: 'A new recipe' })
export class RecipeInput {
  @Field()
  name: string;
}

@InputType({ description: 'Edit a recipe' })
export class EditRecipeInput {
  @Field(() => ID)
  id: number;

  @Field({nullable: true})
  name: string;

  @Field({nullable: true})
  description: string;
}

export interface RecipeOutput extends Recipe {
  num_photos: number;
}
