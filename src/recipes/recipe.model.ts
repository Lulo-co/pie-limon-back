import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Photo } from "./photo.model";

@ObjectType()
export class Recipe {
  @Field(() => ID)
  id: number;

  @Field({ description: 'Recipe title' })
  name: string;

  @Field(() => [Photo], { description: 'Associated photos '})
  photos: Photo[];
}
