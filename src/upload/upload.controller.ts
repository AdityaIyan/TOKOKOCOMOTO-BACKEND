import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { put } from '@vercel/blob';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const blob = await put(file.originalname, file.buffer, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return {
      url: blob.url,
      filename: blob.url,
    };
  }
}
