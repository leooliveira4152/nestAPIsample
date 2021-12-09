import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { getFunction } from '../src/functions/get.js';
import { postFunction } from '../src/functions/post.js';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // simple health check
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // list all videos in specified table
  @Get('/getvideos')
  get(): string {
    return getFunction();
  }

  // store video info in specified table
  @Post('/postvideos')
  @UseInterceptors(FileInterceptor('video'))
  post(@UploadedFile() file, @Body() body): any {
    return postFunction(body, file);
  }
}
