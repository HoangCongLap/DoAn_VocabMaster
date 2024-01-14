import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { env } from 'process';
import { ConfigService } from 'src/config/config.service';

@Controller('upload-vocab-photo')
export class FileUploadController {
  private storageFolderPath: string;
  // constructor(private configService: ConfigService) {
  //   this.storageFolderPath = configService.get().fallbackResourceFolder;
  // }

  @Post('upload')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: this && this.storageFolderPath, //'./uploads',
  //       filename: (req, file, callback) => {
  //         const uniqueSuffix =
  //           Date.now() + '-' + Math.round(Math.random() * 1e9);
  //         callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
  //       },
  //     }),
  //   }),
  // )
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './uploads',
    }),
  )
  async uploadFile(@UploadedFile() file) {
    return { filename: file.originalname };
  }
}
