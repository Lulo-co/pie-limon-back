import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';

@Injectable()
export class GoogleDriveService {
  drive;
  constructor() {
    const scopes = ['https://www.googleapis.com/auth/drive'];
    const auth = new google.auth.JWT(
      process.env.GDRIVE_CLIENT_EMAIL, null,
      process.env.GDRIVE_PRIVATE_KEY, scopes
    );
    this.drive = google.drive({ version: "v3", auth });
  }

  createFile(fileName: string, mimeType: string, body: string): Promise<string> {
    const fileMetadata = {
      name: fileName,
      parents: [process.env.GDRIVE_ROOT_FOLDER],
    };
    const file = { mimeType, body };
    return new Promise((resolve, reject) => {
      this.drive.files.create({
        resource: fileMetadata,
        media: file,
        fields: 'id'
      }, function (err, res) {
        if (err) return reject(err);
        return resolve(res.data.id);
      });
    })
  }

}
