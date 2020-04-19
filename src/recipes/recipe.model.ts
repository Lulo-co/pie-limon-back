import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class Recipe {
  @Field(type => ID)
  id: number;

  @Field({ description: 'Recipe title' })
  name: string;
}
