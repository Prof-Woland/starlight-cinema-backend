import { Controller, Get } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { OkDto } from './dto/movieOk.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiOperation({
      summary: "Получение всех необходимых фильмов"
    })
  @ApiOkResponse({type: OkDto})
  @Get()
  async getAll(){
      return await this.moviesService.getMovies()
  }
}
