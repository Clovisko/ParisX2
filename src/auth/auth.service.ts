import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (user && passwordValid) {
      return {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        accountBalance: user.accountBalance,
        createdAt: user.createdAt,
      };
    }
    return null;
  }
}
