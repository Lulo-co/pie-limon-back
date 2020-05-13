import { Scalar } from "@nestjs/graphql";

export class Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: Function;
}

@Scalar('Upload', () => Upload)
export class UploadScalar {
  description = 'Upload custom scalar type';

  parseValue(value) {
    return value;
  }
}
