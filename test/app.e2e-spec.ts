import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

// 유닛 검사와 e2e 검사는 둘 다 진행하는 것이 프로젝트에 좋다.
// 아무래도 네스트는 여러가지로 사용자에게 편의성을 제공해주는 것 같다.

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // beforeEach(async () => {
  // 라우트 하나를 검사할 때마다 프로그램을 새로 생성하게끔 되어있다.
  // 이걸 아래처럼 바꾸면 계속 같은 데이터를 이용할 수 있다.
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ AppModule, ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }));
    await app.init();
    // 테스트에서 실행하는 프로그램은 실서버에서 실행하는 것과는 다르기 때문에 같은 환경을 만들어줘야한다.
    // 가령 위의 코드가 없다면 트랜스폼이 작동하지 않아서 라우트에 존재하는 패러미터를 문자열에서 숫자로 자동으로 바꿔주지 못한다.
    // 제대로 작동하지 않게 되면 프로그램은 문제가 생기기 때문에 반드시 같은 환경을 만들어주도록 해야한다.
  });

  describe('/', () => {
    it('GET', () => {
      // 이 또한 라우터를 검사하는 것이다.
      request(app.getHttpServer()) // 서버에 접근한다.
        .get('/') // 루트 페이지를 가져온다.
        .expect(200) // 통신 상태가 200 이어야 하고
        .expect('Hello World!!'); // 이 문구가 나타나야한다.
    });
    // 위 코드는 루트 페이지에 들어갔을 때 해당 문자열이 존재하는지에 대한 검사이다.
    // 별 문제가 없으면 검사는 잘 실행된다. 역시나 마찬가지로 여러개의 테스트를 진행할 수 있다.
    // 각 엔드포인트를 검사할 수 있다. 모든 엔드포인트를 검사했을 때에 아무런 이상이 없다면 프로그램은 성공적으로 잘 돌아가는 것이다.
  });

  describe('/movies', () => {
    it('GET', () => {
      request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect([]);
    });
    it('POST', () => {
      request(app.getHttpServer())
        .post('/moives')
        .send({
          title: 'IU',
          genres: [ 'Romance', ],
          year: 2008,
        })
        .expect(201);
    });
    it('DELETE', () => {
      request(app.getHttpServer())
        .delete('/movies')
        .expect(404);
    });
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      request(app.getHttpServer())
        .get('/movies/1')
        .expect(200);
    });
    it('GET 404', () => {
      request(app.getHttpServer())
        .get('/movies/999')
        .expect(404);
    });
    it('PATCH 200', () => {
      request(app.getHttpServer())
        .patch('/movies/1')
        .send({
          title: 'IU is my Goddess',
        })
        .expect(200);
    });
    it('DELETE 200', () => {
      request(app.getHttpServer())
        .delete('/movies/1')
        .expect(200);
    });
    // todo를 사용하면 어떤 검사를 만들어야 할 지 마치 미리 메모하는 것과 같은 효과를 줄 수 있다.
    // 진짜 유용한 기능인 것 같다.
  });
});
