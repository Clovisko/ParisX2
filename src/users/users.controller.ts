import {
  Body,
  Controller,
  Post,
  Request,
  Response,
  Session,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { AuthFilter } from 'src/filter/auth-filter';
import { UsersService } from './users.service';
import { TransactionType } from 'src/commons/transaction-type';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseFilters(AuthFilter)
  @UseGuards(AuthenticatedGuard)
  @Post('/deposit')
  async depositAccount(
    @Request() req,
    @Response() res,
    @Body('phoneNumber') phoneNumber: string,
    @Body('amount') amount: number,
    @Session() session,
  ): Promise<any> {
    await this.usersService.updateAccountBalance(
      req.user,
      TransactionType.CASH_IN,
      phoneNumber,
      amount,
    );
    const user = await this.usersService.findByEmail(req.user.email);
    session.passport.user = user;
    return res.redirect('/');
  }

  @UseFilters(AuthFilter)
  @UseGuards(AuthenticatedGuard)
  @Post('/withdraw')
  async debitAccount(
    @Request() req,
    @Response() res,
    @Body('phoneNumber') phoneNumber: string,
    @Body('amount') amount: number,
    @Session() session,
  ): Promise<any> {
    await this.usersService.updateAccountBalance(
      req.user,
      TransactionType.CASH_OUT,
      phoneNumber,
      amount,
    );
    const user = await this.usersService.findByEmail(req.user.email);
    session.passport.user = user;
    return res.redirect('/');
  }
}
