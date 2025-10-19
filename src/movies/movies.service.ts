import { ConfigService } from '@nestjs/config';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IMoviesResponse } from './interfaces/responseObject.interface';
import { AllLogger } from 'src/common/log/logger.log';

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
        const allUrl = 'https://api.kinopoisk.dev/v1.4/movie?page=1&limit=50&type=movie&year=2023-2025&audience.count=10000-999999999999999';
        const allResponse = await fetch(allUrl, {
        method: "GET",
        headers: {"X-API-KEY":this.API_KEY},
        });
        if(!allResponse.ok){
            this.logger.warn('Error with allUrl response', this.name);
            throw new InternalServerErrorException('Error with allUrl response')
        }
        const allData = await this.necessaryData(await allResponse.json());

        const oneUrl = 'https://api.kinopoisk.dev/v1.4/movie?page=1&limit=1&type=movie&year=2025-2026&rating.kp=8-10&audience.count=10000-999999999999999';
        const oneResponse = await fetch(oneUrl, {
        method: "GET",
        headers: {"X-API-KEY":this.API_KEY},
        });
        if(!oneResponse.ok){
            this.logger.warn('Error with oneUrl response', this.name);
            throw new InternalServerErrorException('Error with oneUrl response')
        }
        const oneData = await this.necessaryData(await oneResponse.json());

        const popularUrl = 'https://api.kinopoisk.dev/v1.4/movie?page=1&limit=20&type=movie&year=2010-2025&rating.kp=8-10&audience.count=10000-999999999999999';
        const popularResponse = await fetch(popularUrl, {
        method: "GET",
        headers: {"X-API-KEY":this.API_KEY},
        });
        if(!popularResponse.ok){
            this.logger.warn('Error with popularUrl response', this.name);
            throw new InternalServerErrorException('Error with popularUrl response')
        }
        const popularData = await this.necessaryData(await popularResponse.json());
        this.logger.log('Successful!', this.name)
        return {main: oneData, popular: popularData, all: allData}
    }

    private necessaryData(response: IMoviesResponse){
        const array = response.docs;
        let moviesArray: any = [];
        for (let index = 0; index < array.length; index++) {
            const element: any = array[index];
            const name = element.name || element.alternativeName || "Неизвестно"
            const urlObject = element.poster
            let url: string
            if(urlObject && (typeof urlObject.url != undefined || urlObject.url != undefined)){
                url = urlObject.url
            }
            else{
                url = ""
            }
            const movie = {id: element.id, name, url}
            moviesArray.push(movie)
        }
        return moviesArray
    }
}
