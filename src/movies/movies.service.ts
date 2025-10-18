import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MoviesService {
    private readonly name = MoviesService.name
    constructor(private readonly PrismaService: PrismaService){}

    async getMovies(){
        const allUrl = 'https://api.kinopoisk.dev/v1.4/movie?page=1&limit=50&type=movie&year=2023-2025&audience.count=10000-999999999999999';
        const allResponse = await fetch(allUrl, {
        method: "GET",
        headers: {"X-API-KEY":"1MBWWDE-06741J4-J0WA2GT-Z1P4C5Y"},
        });
        const allData = await allResponse.json();

        const oneUrl = 'https://api.kinopoisk.dev/v1.4/movie?page=1&limit=1&type=movie&year=2025-2026&rating.kp=8-10&audience.count=10000-999999999999999';
        const oneResponse = await fetch(oneUrl, {
        method: "GET",
        headers: {"X-API-KEY":"1MBWWDE-06741J4-J0WA2GT-Z1P4C5Y"},
        });
        const oneData = await oneResponse.json();

        const popularUrl = 'https://api.kinopoisk.dev/v1.4/movie?page=1&limit=20&type=movie&year=2010-2025&rating.kp=8-10&audience.count=10000-999999999999999';
        const popularResponse = await fetch(popularUrl, {
        method: "GET",
        headers: {"X-API-KEY":"1MBWWDE-06741J4-J0WA2GT-Z1P4C5Y"},
        });
        const popularData = await popularResponse.json();
        return {main: oneData.docs, popular: popularData.docs, all: allData.docs}
    }
}
