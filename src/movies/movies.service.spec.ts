import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('AppService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ MoviesService, ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // 테스트에 대한 이름을 정해주고, 해당 테스트에 대한 실질적인 내용을 작성해준다.
  // 아래와 같은 경우에는 2 + 2의 결과가 4와 같다는 의미고, 이게 참이면 테스트는 통과하게 된다.

  // it('should be 4', () => {
  //   expect(2 + 2).toEqual(4);
  // });

  // 하나의 테스트 안에서 여러개의 세부 테스트를 진행할 수 있다.

  describe('getAll', () => {
    it('should return as array', () => {
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
      // 배열을 리텅하는지 검사한다. 트루면 아무런 문제가 없는 것이다.
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: '테스트',
        year: 2000,
        genres: [],
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
    });

    it('should theow 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        title: '테스트',
        year: 2000,
        genres: [],
      });

      const allMovies = service.getAll();
      service.deleteOne(1);
      const afterDelete = service.getAll();

      expect(afterDelete.length).toEqual(allMovies.length - 1);
      // 검사는 이런식으로 진행해보면 된다. 이런식으로 진행을 하면 문제를 최대한 억제할 수 있다.
      // 검사를 전부 마치면 프로그램의 완성도가 높아진다. 이를 백분률로 확인해볼 수도 있다.
      // 예를 들어 이 파일은 100%의 테스트가 완료되었다.
    });

    it('should throw a NotFoundException', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        genres: [ 'test', ],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: [ 'test', ],
        year: 2000,
      });
      service.update(1, { title: 'Updated Test', });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');
    });

    it('should throw a NotFoundException', () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
