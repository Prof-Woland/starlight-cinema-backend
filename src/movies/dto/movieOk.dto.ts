import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class OkDto{
    @ApiProperty({
            title: "Главный фильм (только 1 шт.)",
            example: `[{
			"id": 8489718,
			"name": "Лёша из Лавры. Погребающий странных",
			"url": "https://image.openmoviedb.com/kinopoisk-images/9784475/87b40574-4091-4377-a769-7a229f172242/600x900"
		}]`
    })
    @IsNotEmpty({message: 'Значение не должно быть пустым'})
    main: [];

    @ApiProperty({
            title: "Популярные фильмы (20 шт.)",
            example: `[{
			"id": 8489718,
			"name": "Лёша из Лавры. Погребающий странных",
			"url": "https://image.openmoviedb.com/kinopoisk-images/9784475/87b40574-4091-4377-a769-7a229f172242/600x900"
		}, ...]`
    })
    @IsNotEmpty({message: 'Значение не должно быть пустым'})
    popular: [];

    @ApiProperty({
            title: "Все фильмы (50 шт.)",
            example: `[{
			"id": 8489718,
			"name": "Лёша из Лавры. Погребающий странных",
			"url": "https://image.openmoviedb.com/kinopoisk-images/9784475/87b40574-4091-4377-a769-7a229f172242/600x900"
		}, ...]`
    })
    @IsNotEmpty({message: 'Значение не должно быть пустым'})
    all: [];
}