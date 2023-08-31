import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

class FileModule {
  async createFile(file: IFile): Promise<string> {
    try {
      const extension = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + extension;
      const filePath = path.resolve(__dirname, '..', '..', 'static');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, fileName), file?.buffer);

      return fileName;
    } catch (error) {
      throw error;
    }
  }

  async deleteFile(fileName: string) {
    try {
      const file = path.resolve('static', fileName);
      await fs.rm(file, (err) => {
        throw err;
      });
    } catch (error) {
      throw error;
    }
  }
}

export interface IFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

export const fileModule = new FileModule();
