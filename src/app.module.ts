import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './cart/cart.module';
import { PostsModule } from './posts/posts.module';
import { MailModule } from './mail/mail.module';
import { UploadController } from './upload/upload.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import * as fs from 'fs';

const publicPath = join(process.cwd(), 'public');
const isPublicDirExists = fs.existsSync(publicPath);

const staticModules = isPublicDirExists
  ? [ServeStaticModule.forRoot({ rootPath: publicPath, serveRoot: '/public' })]
  : [];

@Module({
  imports: [
    ...staticModules,
    PrismaModule,
    AuthModule,
    ProductsModule,
    OrdersModule,
    CartModule,
    PostsModule,
    MailModule,
  ],
  controllers: [AppController, UploadController],
  providers: [AppService],
})
export class AppModule {}

