import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { Movie } from './entities/movies.entities';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-move.dto';

// 네스트는 익스프레스 위에서 돌아가기 때문에 익스프레스의 기능을 사용할 수도 있다.
// 리퀘스트나 리스폰스 같은 기능을 사용할 수도 있다. 이 역시도 데코레이터를 이용한다.
// 하지만 추천되지는 않는다.

@Controller('movies')
// 라우터를 의미한다. 적히는 주소는 라우터의 주소를 의미하게 된다.
// 아무것도 없으면 해당 주소의 루트를 index를 의미한다.
// 중요한 것은 데코레이터와 메소드는 붙어있어야한다.
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get(':id')
  // 이런 요청이 위에 있으면 원하는 작동을 하지 않을 수도 있다. 동적인 요청은 정적인 요청 아래에 두는 게 좋다.
  // 이런식으로 하면 동적인 접근이 가능하다.
  getOne(@Param('id') movieId: number): Movie {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    // 이런식으로 가져오는 것이 가능하다. 바디의 경우엔 JSON을 가져올 수 있다.
    // 쿼리의 경우에는 주소에 있는 쿼리를 가져올 수 있다.
    return this.moviesService.create(movieData);
  }

  @Delete(':id')
  remove(@Param('id') movieId: number) {
    // 주소에 들어간 파라미터를 가져오기 위해서는 이렇게 하면 된다. 만일 데코레이터를 지정하지 않으면 아무런 소용이 없다.
    return this.moviesService.deleteOne(movieId);
  }

  @Patch(':id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.update(movieId, updateData);
  }

  // @Post 는 말 그대로 데이터를 보낼 때의 경우이다.
  // @Delete 는 데이터를 없앨 때의 경우이다.
  // @Put 은 데이터를 바꿀 때 사용한다. 갱신하는데, 모든걸 갱신한다.
  // @Patch 는 역시나 마찬가지로 데이터를 바꾸는데, 일부분만 갱신하는 것이다.
}
