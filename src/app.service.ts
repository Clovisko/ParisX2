import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  appStatus(): string {
    return 'UP!';
  }
}
