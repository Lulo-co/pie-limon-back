import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Photo } from './photo.model';

@ObjectType()
export class Recipe {
  @Field(() => ID)
  id: number;

  @Field({ description: 'Recipe title' })
  name: string;

  @Field({ description: 'Recipe description', nullable: true })
  description: string;

  @Field(() => Int)
  num_photos: number;

  @Field(() => [Photo], { description: 'Associated photos ' })
  photos: Photo[];
}
