import { ConfigService } from '@nestjs/config';
import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { IMovie, IMoviesResponse } from './interfaces/responseObject.interface';
import { AllLogger } from 'src/common/log/logger.log';
import { Movie } from 'prisma/generated/prisma/client';

@Injectable()
export class MoviesService {
    private readonly name = MoviesService.name;
    private readonly logger = new AllLogger()
    private readonly API_KEY: string;
    constructor(private readonly prismaService: PrismaService, private readonly configService: ConfigService){
        this.API_KEY = this.configService.getOrThrow('MOVIES_API_KEY')
    }

    async getMovies(){
        this.logger.log('Try to get movies', this.name);
        
        let skipNumber = this.getRandom();
        const allMovies = await this.prismaService.movie.findMany({
            skip: skipNumber,
            take: 50,
        })
        const allData = await this.necessaryData(allMovies);

        // await this.addToDatabase(allBasic);

        skipNumber = this.getRandom();
        const oneMovie = await this.prismaService.movie.findFirst({
            where:{
                rating: {
                    gte: 5
                }
            },
            skip: skipNumber,
            take: 1
        })
        const oneData = await this.necessaryOneData(oneMovie);

        const popularMovies = await this.prismaService.movie.findMany({
            where:{
                rating:{
                    gte: 8
                }
            },
            take: 20,
        })
        const popularData = await this.necessaryData(popularMovies);
        this.logger.log('Successful!', this.name)
        return {main: oneData, popular: popularData, all: allData}
    }

    async getMovie(paramId: string){
        this.logger.log('Try to get all info about film', this.name);
        let id: number;
        try{
            id = parseInt(paramId)
        }catch(e){
            this.logger.warn('ID is string!', this.name)
            throw new BadRequestException('ID is string!')
        }
        const movie = await this.prismaService.movie.findUnique({
            where:{
                id
            }
        })

        if(!movie){
            this.logger.warn('Movie with this id not found', this.name);
            throw new NotFoundException('Movie with this id not found')
        }

        this.logger.log("Successful!", this.name);
        return movie
    }

    private necessaryData(response: any){
        const array = response;
        let moviesArray: any = [];
        for (let index = 0; index < array.length; index++) {
            const element: any = array[index];
            const name = element.name || element.alternativeName || "Неизвестно"
            const url = element.poster
            const movie = {id: element.id, name, url}
            moviesArray.push(movie)
        }
        return moviesArray
    }

    private necessaryOneData(response: any){
        const object: IMovie = response;
        const movie = {id: object.id, name: object.name, url: object.poster}
        return movie
    }

    private async addToDatabase(data: IMoviesResponse){
        const array = data.docs;
        let moviesArray: any = [];
        for (let index = 0; index < array.length; index++) {
            const element: any = array[index];
            const id = element.id;
            const name = element.name || element.alternativeName || "Неизвестно"
            const description = element.description || '';
            const rating = element.rating.kp;
            const movieLength = element.movieLength || 0;
            const ageRating = element.ageRating || 0;
            const genresArray = element.genres || undefined;
            let genres: any = [];
            if(genresArray){
                console.log(genresArray)
                for (let i = 0; i < genresArray.length; i++){
                const name = genresArray[i].name
                genres.push(name)
            }}
            else{
                genres = []
            }
            const urlObject = element.poster
            let url: string
            if(urlObject && (typeof urlObject.url != undefined || urlObject.url != undefined)){
                url = urlObject.url
            }
            else{
                url = ""
            }
            const movie = {id, name, description, rating, movieLength, ageRating, genres, poster: url}
            moviesArray.push(movie)
        }

        const created = await this.prismaService.movie.createMany({
            data: moviesArray
        })

        this.logger.log(created, this.name)
        return true
    }

    private getRandom(){
        const skipFirst = Math.ceil(Math.random()*100);
        const skipSecond = 100 + Math.floor(Math.random()*100);
        const skipThird = 200 + Math.floor(Math.random()*100);
        const skipFourth = 300 + Math.floor(Math.random()*100);
        const random = Math.floor(Math.random()*10);
        let skip: number;
        if(random >= 0 && random < 5){
            skip = skipFirst;
        }else if(random >= 5 && random < 10){
            skip = skipThird;
        }else if(random >= 10 && random < 15){
            skip = skipSecond;
        }else{
            skip = skipFourth;
        }
        return skip
    }
}
