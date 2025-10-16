import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MoviesService {
    private readonly name = MoviesService.name
    constructor(private readonly PrismaService: PrismaService){}

    async getMovies(){
        const url = 'https://api.kinopoisk.dev/v1.4/movie?page=1&limit=250&type=movie&year=2023-2025&countries.name=%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F&countries.name=%D0%A1%D0%A8%D0%90&countries.name=%D0%92%D0%B5%D0%BB%D0%B8%D0%BA%D0%BE%D0%B1%D1%80%D0%B8%D1%82%D0%B0%D0%BD%D0%B8%D1%8F&countries.name=%D0%A4%D1%80%D0%B0%D0%BD%D1%86%D0%B8%D1%8F&audience.count=10000000-999999999999999';
        const response = await fetch(url, {
        method: "GET",
        headers: {"X-API-KEY":"1MBWWDE-06741J4-J0WA2GT-Z1P4C5Y"},
        });
        const data = await response.json();
        return data
    }
}
