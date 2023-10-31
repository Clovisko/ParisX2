import {
  Controller,
  Get,
  Render,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticatedGuard } from './auth/authenticated.guard';
import { AuthFilter } from './filter/auth-filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseFilters(AuthFilter)
  @UseGuards(AuthenticatedGuard)
  @Get('/')
  @Render('home/index')
  dashboard(@Request() req) {
    return { message: 'Hello world!', user: req.user };
  }

  @Get('/status')
  appStatus(): string {
    return this.appService.appStatus();
  }
}
