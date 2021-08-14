import { Injectable } from '@nestjs/common';

// 실제로 요청에 대한 부분을 실행하는 곳이다.

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
