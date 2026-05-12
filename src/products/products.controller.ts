import { Controller, Get, Post, Body, Put, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { put } from '@vercel/blob';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SELLER')
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() body: any, @Req() req: any, @UploadedFile() file: Express.Multer.File) {
    const data = { ...body };
    if (file) {
      const blob = await put(file.originalname, file.buffer, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      data.images = JSON.stringify([blob.url]);
    } else if (data.image) {
      data.images = JSON.stringify([data.image]);
    } else {
      data.images = JSON.stringify(['']);
    }
    return this.productsService.create(data, req.user.username);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SELLER')
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(@Param('id') id: string, @Body() body: any, @Req() req: any, @UploadedFile() file: Express.Multer.File) {
    const data = { ...body };
    if (file) {
      const blob = await put(file.originalname, file.buffer, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      data.images = JSON.stringify([blob.url]);
    }
    return this.productsService.update(id, data, req.user.username, req.user.role);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SELLER')
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.productsService.remove(id, req.user.username, req.user.role);
  }
}
