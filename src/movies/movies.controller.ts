import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { OkDto, OkOneDto } from './dto/movieOk.dto';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { createShowDto } from './dto/createShow.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiOperation({
      summary: "Получение всех необходимых фильмов"
    })
  @ApiOkResponse({type: OkDto})
  @Get()
  @Authorization()
  async getAll(){
    return await this.moviesService.getMovies()
  }

  @ApiOperation({
      summary: "Получение подробной информации о фильме"
    })
  @ApiOkResponse({type: OkOneDto})
  @Get('/:id')
  @Authorization()
  async getOne(@Param('id') id: string){
    return await this.moviesService.getMovie(id)
  }

  @ApiOperation({
    summary: "Создание нового показа фильма"
  })
  @ApiOkResponse()
  
  @Post('createShow/:id')
  @Authorization()
  async createShow(@Body() dto: createShowDto, @Param('id') id: string){
    return await this.moviesService.createShow(+id, dto)
  }

  @ApiOperation({
    summary: "Получение показов фильма"
  })
  @ApiOkResponse()
  @Get('shows/:id')
  @Authorization()
  async getShows(@Param('id') id: string){
    return await this.moviesService.getShows(+id)
  }
}
