import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    // 별다른 조치를 취하지 않아도 아래처럼 해두면 원하지 않은 값을 차단할 수 있다.
    whitelist: true,
    forbidNonWhitelisted: true,
    // 자동으로 타입을 변경해준다.
    transform: true,
  }));

  await app.listen(3000);
}
bootstrap();
