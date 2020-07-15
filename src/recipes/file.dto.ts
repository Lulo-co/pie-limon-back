import { InputType, Field } from '@nestjs/graphql';
import { Upload } from './upload.scalar';

@InputType({ description: 'A new recipe' })
export class FileInput {
  @Field()
  file: Upload;
}
