import { Length } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { IMovie, IMoviesResponse } from './interfaces/responseObject.interface';
import { AllLogger } from 'src/common/log/logger.log';
import { Movie, User } from 'prisma/generated/prisma/client';
import { bookATicket, createShowDto, getTime } from './dto/createShow.dto';
import * as fs from 'fs';
import * as path from 'path';

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

        // const allMovies = await this.prismaService.movie.findMany({
        // })

        // const filePath = path.join(__dirname, '..', 'output.txt'); // Указываем путь к файлу

        // const fileContent = fs.readFileSync('./src/movies/output.txt', 'utf8');

        // const allData = await this.necessaryData(allMovies);

        // await this.addToDatabase(JSON.parse(fileContent));

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
        return {main: oneData, popular: popularData, all: allMovies}
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

    async getShows(id: number){
        this.logger.log("Try to get movie's shows", this.name);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const stringDate = yesterday.toLocaleDateString('ru-RU', {year: 'numeric', month: '2-digit', day: '2-digit',});
        // const expiredShows = await this.prismaService.shows.deleteMany({
        //     where:{
        //         movieId: id,
        //         date: {lt: stringDate}
        //     }
        // });
        
        const shows = await this.prismaService.shows.findMany({
            where:{
                movieId: id
            }
        });

        let newShows :any = []

        for (let index = 0; index < shows.length; index++) {
            const element = shows[index];
            newShows.push({
                id: element.id,
                day: element.day,
                date: element.date,
                time: JSON.parse(element.time),
            })
        }

        if(!shows){
            this.logger.warn("Shows not found", this.name);
        }

        const parseDate = (dateStr: string): Date => {
            const [day, month, year] = dateStr.split('.').map(Number);
            return new Date(year, month - 1, day); // месяц - 1, т.к. в JS месяцы с 0
        };

        const sortedData = newShows.sort((a: any, b: any) => {
            const dateA = parseDate(a.date);
            const dateB = parseDate(b.date);
            return dateA.getTime() - dateB.getTime();
        });

        this.logger.log("Successful", this.name);
        return sortedData
    }

    async createShow(id: number, dto: createShowDto){
        this.logger.log("Try to create one show", this.name);
        const {date, time} = dto;
        const existShow = await this.prismaService.shows.findFirst({
            where:{
                movieId: id,
                date,
            }
        });

        const movieIds = await this.prismaService.movie.findMany({
            select:{
                id: true
            }
        })

        if(existShow){
            this.logger.warn('This show is already exist', this.name);
            throw new ConflictException('This show is already exist')
        }

        const places = [
    [
      { id: 1, mode: 'free' },
      { id: 2, mode: 'free' },
      { id: 3, mode: 'free' },
      { id: 4, mode: 'free' },
      { id: 5, mode: 'free' },
      { id: 6, mode: 'free' },
      { id: 7, mode: 'free' },
      { id: 8, mode: 'free' },
      { id: 9, mode: 'free' },
      { id: 10, mode: 'free' },
      { id: 11, mode: 'free' },
    ],
    [
      { id: 1, mode: 'free' },
      { id: 2, mode: 'free' },
      { id: 3, mode: 'free' },
      { id: 4, mode: 'free' },
      { id: 5, mode: 'free' },
      { id: 6, mode: 'free' },
      { id: 7, mode: 'free' },
      { id: 8, mode: 'free' },
      { id: 9, mode: 'free' },
      { id: 10, mode: 'free' },
      { id: 11, mode: 'free' },
    ],
    [
      { id: 1, mode: 'free' },
      { id: 2, mode: 'free' },
      { id: 3, mode: 'free' },
      { id: 4, mode: 'free' },
      { id: 5, mode: 'free' },
      { id: 6, mode: 'free' },
      { id: 7, mode: 'free' },
      { id: 8, mode: 'free' },
      { id: 9, mode: 'free' },
      { id: 10, mode: 'free' },
      { id: 11, mode: 'free' },
      { id: 12, mode: 'free' },
      { id: 13, mode: 'free' },
    ],
    [
      { id: 1, mode: 'free' },
      { id: 2, mode: 'free' },
      { id: 3, mode: 'free' },
      { id: 4, mode: 'free' },
      { id: 5, mode: 'free' },
      { id: 6, mode: 'free' },
      { id: 7, mode: 'free' },
      { id: 8, mode: 'free' },
      { id: 9, mode: 'free' },
      { id: 10, mode: 'free' },
      { id: 11, mode: 'free' },
      { id: 12, mode: 'free' },
      { id: 13, mode: 'free' },
    ],
    [
      { id: 1, mode: 'free' },
      { id: 2, mode: 'free' },
      { id: 3, mode: 'free' },
      { id: 4, mode: 'free' },
      { id: 5, mode: 'free' },
      { id: 6, mode: 'free' },
      { id: 7, mode: 'free' },
      { id: 8, mode: 'free' },
      { id: 9, mode: 'free' },
      { id: 10, mode: 'free' },
      { id: 11, mode: 'free' },
      { id: 12, mode: 'free' },
      { id: 13, mode: 'free' },
    ],
    [
      { id: 1, mode: 'free' },
      { id: 2, mode: 'free' },
      { id: 3, mode: 'free' },
      { id: 4, mode: 'free' },
      { id: 5, mode: 'free' },
      { id: 6, mode: 'free' },
      { id: 7, mode: 'free' },
      { id: 8, mode: 'free' },
      { id: 9, mode: 'free' },
      { id: 10, mode: 'free' },
      { id: 11, mode: 'free' },
      { id: 12, mode: 'free' },
      { id: 13, mode: 'free' },
    ],
    [
      { id: 1, mode: 'free' },
      { id: 2, mode: 'free' },
      { id: 3, mode: 'free' },
      { id: 4, mode: 'free' },
      { id: 5, mode: 'free' },
      { id: 6, mode: 'free' },
      { id: 7, mode: 'free' },
      { id: 8, mode: 'free' },
      { id: 9, mode: 'free' },
      { id: 10, mode: 'free' },
      { id: 11, mode: 'free' },
      { id: 12, mode: 'free' },
      { id: 13, mode: 'free' },
    ],
    [
      { id: 1, mode: 'free' },
      { id: 2, mode: 'free' },
      { id: 3, mode: 'free' },
      { id: 4, mode: 'free' },
      { id: 5, mode: 'free' },
      { id: 6, mode: 'free' },
      { id: 7, mode: 'free' },
      { id: 8, mode: 'free' },
      { id: 9, mode: 'free' },
      { id: 10, mode: 'free' },
      { id: 11, mode: 'free' },
      { id: 12, mode: 'free' },
      { id: 13, mode: 'free' },
    ],
    [
      { id: 1, mode: 'free' },
      { id: 2, mode: 'free' },
      { id: 3, mode: 'free' },
      { id: 4, mode: 'free' },
      { id: 5, mode: 'free' },
      { id: 6, mode: 'free' },
      { id: 7, mode: 'free' },
      { id: 8, mode: 'free' },
      { id: 9, mode: 'free' },
      { id: 10, mode: 'free' },
      { id: 11, mode: 'free' },
      { id: 12, mode: 'free' },
      { id: 13, mode: 'free' },
    ],
    [
      { id: 1, mode: 'free' },
      { id: 2, mode: 'free' },
      { id: 3, mode: 'free' },
      { id: 4, mode: 'free' },
      { id: 5, mode: 'free' },
      { id: 6, mode: 'free' },
      { id: 7, mode: 'free' },
      { id: 8, mode: 'free' },
      { id: 9, mode: 'free' },
      { id: 10, mode: 'free' },
      { id: 11, mode: 'free' },
      { id: 12, mode: 'free' },
      { id: 13, mode: 'free' },
    ],
        ]

        const days = [
            'ВС',
            'ПН',
            'ВТ',
            'СР',
            'ЧТ',
            'ПТ',
            'СБ'
        ];

        const parts = date.split('.');
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);

        const normalDate = new Date(year, month, day);
        const dayName = days[normalDate.getDay()];

        let shows : any = [];
        movieIds.forEach(element => {
            let timePlaces: any = [];
            let times : any = [];
            time.forEach(el=>{
                timePlaces.push({
                    time: el.time,
                    places: places,
                })
                times.push({
                    time: el.time,
                    hall: el.hall,
                    bookedPlaces: 0
                })
            })
            shows.push({
                movieId: element.id,
                date,
                day: dayName,
                time: JSON.stringify(times),
                places: JSON.stringify(timePlaces),
            })

        });

        const newShow = await this.prismaService.shows.createMany({
            data:shows
            })
        this.logger.log("Successful", this.name);
        return newShow
    }

    async bookATicket(id: string, dto: bookATicket, user: User){
        const {time, tickets} = dto
        console.log(time)
        console.log(tickets)
        this.logger.log("Try to book tickets", this.name);

        let ticketsArr : any = [];
        let checkRow: any = [];
        let checkPlace: any = [];
        const ids = await this.prismaService.shows.findUnique({
            where: {id},
            select: {
                movieId: true,
                day: true,
                date: true
            }
        })
        const costs = await this.prismaService.movie.findUnique({
            where:{
                id: ids?.movieId
            },
            select:{
                cost: true,
                name: true
            }
        })

        const show = await this.prismaService.shows.findUnique({
            where: {
                id
            },
            select:{
                places: true,
                time: true
            }
        })

        let bookedPlaces = JSON.parse(show?.time||'')
        tickets.forEach(element => {
            const needTimeBook = bookedPlaces.findIndex(item => item.time === time);
            ticketsArr.push({
                showId: id,
                userId: user.id,
                row: element.row,
                place: element.place,
                time: time,
                day: ids?.day,
                date: ids?.date,
                name: costs?.name,
                hall: bookedPlaces[needTimeBook].hall,
                cost: costs?.cost,
            });

            checkRow.push(element.row);

            checkPlace.push(element.row)
        });

        const orConditions = ticketsArr.map(userData => ({
            AND: [
            { row: userData.row },
            { place: userData.place },
            ],
        }));

        const exist = await this.prismaService.tickets.findMany({
            where:{
                showId: id,
                time,
                OR: orConditions,
            }
        })

        if(exist.length>0){
            console.log(exist)
            this.logger.warn("One of tickets is exist", this.name);
            throw new ConflictException();
        }

       
        let freePlaces = JSON.parse(show?.places||'')
        console.log(ticketsArr.length)
        tickets.forEach(element => {
            const needTime = freePlaces.findIndex(item => item.time === time);
            const needTimeBook = bookedPlaces.findIndex(item => item.time === time);
            const row = element.row;
            const place = element.place;
            const needRow = freePlaces[needTime].places[row];
            const needPlace = needRow.findIndex(item => item.id === place);
            console.log(freePlaces)
            console.log(freePlaces[needTime].places[row][needPlace])
            console.log(freePlaces[needTime].places[row][needPlace].mode = "taken")
            freePlaces[needTime].places[row][needPlace].mode = "taken";
            bookedPlaces[needTimeBook].bookedPlaces = bookedPlaces[needTimeBook].bookedPlaces + 1;
        });

        //let booked = JSON.parse(show?.bookedPlaces||'')

        const newTickets = await this.prismaService.tickets.createMany({
            data: ticketsArr
        })
        const updateShow = await this.prismaService.shows.update({
            where:{
                id
            },
            data:{
                places: JSON.stringify(freePlaces),
                time: JSON.stringify(bookedPlaces),
            }
        })

        this.logger.log("Successful", this.name);
        return true
    }

    async getTicketsForUser(user: User){
        this.logger.log("Try to get tickets", this.name);
        const tickets = await this.prismaService.tickets.findMany({
            where:{
                userId: user.id
            },
            select:{
                id: true,
                name: true,
                day: true,
                date: true,
                time: true,
                hall: true,
                row: true,
                place: true,
            }
        })
        this.logger.log("Successful", this.name);
        return tickets
    }

    async getTicketsForShow(id: string, dto: getTime){
        const {time} = dto
        this.logger.log("Try to get places", this.name);
        let place = await this.prismaService.shows.findUnique({
            where:{
                id
            },
            select:{
                places: true
            }
        })
        const placesStr = place?.places
        const placesArr = JSON.parse(placesStr || "")

        const needTime = placesArr.findIndex(item => item.time === time);
        this.logger.log("Successful", this.name);
        return placesArr[needTime]
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

    private async addToDatabase(data: any){
        const array = data;
        let moviesArray: any = [];
        for (let index = 0; index < array.length; index++) {
            const element: any = array[index];
            const id = element.id;
            const name = element.name || "Неизвестно"
            const description = element.description || '';
            const rating = element.rating;
            const movieLength = element.movieLength || 0;
            const ageRating = element.ageRating || 0;
            const genresArray = element.genres || undefined;
            const urlObject = element.poster
            const movie = {id, name, description, rating, movieLength, ageRating, genres:genresArray, poster: urlObject}
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
