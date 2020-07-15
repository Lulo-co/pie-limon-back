import { InputType, Field } from '@nestjs/graphql';

@InputType({ description: 'A new recipe' })
export class RecipeInput {
  @Field()
  name: string;
}
