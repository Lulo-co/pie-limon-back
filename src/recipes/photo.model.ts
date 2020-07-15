import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Photo {
  @Field(() => ID)
  id: number;

  @Field({ description: 'Photo url' })
  url: string;
}
