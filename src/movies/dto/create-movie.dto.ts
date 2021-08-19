import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  // 데코레이터를 통해서 유효성 검사를 한다.
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsOptional()
  @IsString({ each: true, })
  readonly genres: string[];
}
