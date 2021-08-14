import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
// 라우터를 의미한다.
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // 아무것도 없으면 해당 주소의 루트를 index를 의미한다.
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/:word')
  // 이 둘은 붙어있어야만 한다.
  // 이런식으로 하면 동적인 접근이 가능하다.
  getWord(@Param('word') word: string): string {
    // 주소에 들어간 파라미터를 가져오기 위해서는 이렇게 하면 된다. 만일 데코레이터를 지정하지 않으면 아무런 소용이 없다.
    return `이 페이지는 ${word} 페이지입니다.`;
  }

  // @Post 는 말 그대로 데이터를 보낼 때의 경우이다.
  // @Delete 는 데이터를 없앨 때의 경우이다.
  // @Put 은 데이터를 바꿀 때 사용한다. 갱신하는데, 모든걸 갱신한다.
  // @Patch 는 역시나 마찬가지로 데이터를 바꾸는데, 일부분만 갱신하는 것이다.
}
