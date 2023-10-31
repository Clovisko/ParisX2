import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  Response,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth-guard';
import { UsersService } from './../users/users.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/sign-up')
  addUserForm(@Res() res, @Request() req) {
    const r = req.flash('result');
    let result: string;
    if (r) {
      result = r[0];
    }
    return res.render('auth/sign-up', {
      layout: 'layouts/auth',
      result: result,
    });
  }

  @Post('/sign-up')
  async addUser(
    @Body('fullName') fullName: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Request() req,
    @Response() res,
  ) {
    let result: string;
    try {
      await this.usersService.create(fullName, email, password);
      result = 'User was successfully created!';
    } catch (exception) {
      result = 'Failed to create account!';
    }
    req.flash('result', result);
    return res.redirect('/auth/sign-up');
  }

  @Get('/sign-in')
  signInForm(@Request() req, @Response() res) {
    if (req.isAuthenticated()) {
      return res.redirect('/');
    } else {
      return res.render('auth/sign-in', {
        layout: 'layouts/auth',
        message: 'Hello World',
      });
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  login(@Request() req, @Response() res): any {
    if (req.isAuthenticated()) {
      return res.redirect('/');
    } else {
      return res.redirect('/auth/loginn');
    }
  }

  @Get('/reset-password')
  addPasswordResetForm(@Res() res) {
    return res.render('auth/reset-password', {
      layout: 'layouts/auth',
      message: 'Hello World',
    });
  }

  @Post('/reset-password')
  async passwordReset(@Body('email') email: string, @Res() res) {
    await this.usersService.resetPassword(email);
    return res.redirect('/auth/sign-in');
  }

  @Get('/sign-out')
  logout(@Request() req, @Res() res): any {
    req.session.destroy();
    return res.redirect('/auth/sign-in');
  }
}
