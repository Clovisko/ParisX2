import * as bcrypt from 'bcrypt';

export class AppHelper {
  static async hashPassword(rawPassword: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(rawPassword, saltOrRounds);
  }
}
