import { Injectable } from '@nestjs/common';
import { google, drive_v3 as DriveV3 } from 'googleapis';

const FILE_URL = 'https://drive.google.com/uc?id=';

@Injectable()
export class GoogleDriveService {
  private drive: DriveV3.Drive;

  constructor() {
    const scopes = ['https://www.googleapis.com/auth/drive'];
    const auth = new google.auth.JWT(
      process.env.GDRIVE_CLIENT_EMAIL,
      null,
      process.env.GDRIVE_PRIVATE_KEY,
      scopes,
    );
    this.drive = google.drive({ version: 'v3', auth });
  }

  /**
   * Create a file in a google drive folder
   * @param fileName
   * @param mimeType
   * @param body
   *
   * @returns Promises with id of file created
   */
  createFile(
    fileName: string,
    mimeType: string,
    body: NodeJS.ReadStream,
  ): Promise<string> {
    const fileMetadata = {
      name: fileName,
      parents: [process.env.GDRIVE_ROOT_FOLDER],
    };
    const file = { mimeType, body };
    return new Promise((resolve, reject) => {
      this.drive.files.create(
        {
          requestBody: fileMetadata,
          media: file,
          fields: 'id',
        },
        function(err, res) {
          if (err) return reject(err);
          return resolve(`${FILE_URL}${res.data.id}`);
        },
      );
    });
  }

  async deleteFile(url: string): Promise<void> {
    const fileId = url.replace(FILE_URL, '');
    await this.drive.files.delete({ fileId });
  }
}
