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

export class OkOneDto{
    @ApiProperty({
      title: "ID фильма",
      example: `7605663`
    })
    @IsNotEmpty({message: 'Значение не должно быть пустым'})
    id: number;

    @ApiProperty({
      title: "Название фильма",
      example: `Диодорова. Против течения`
    })
    @IsNotEmpty({message: 'Значение не должно быть пустым'})
    name: string;

    @ApiProperty({
      title: "Описание фильма",
      example: `История жизни и карьеры российской спортсменки Анастасии Диодоровой.`
    })
    @IsNotEmpty({message: 'Значение не должно быть пустым'})
    description: string;

    @ApiProperty({
      title: "Рейтинг фильма (по КП)",
      example: `8.535`
    })
    @IsNotEmpty({message: 'Значение не должно быть пустым'})
    rating: number;

    @ApiProperty({
      title: "Продолжительность фильма (в минутах)",
      example: `93`
    })
    @IsNotEmpty({message: 'Значение не должно быть пустым'})
    movieLength: number;

    @ApiProperty({
      title: "Возрастной рейтинг",
      example: `12`
    })
    @IsNotEmpty({message: 'Значение не должно быть пустым'})
    ageRating: number;

    @ApiProperty({
      title: "Жанры фильма",
      example: `["спорт", "драма", "биография"]`
    })
    @IsNotEmpty({message: 'Значение не должно быть пустым'})
    genres: string[];

    @ApiProperty({
      title: "Ссылка на постер",
      example: `https://image.openmoviedb.com/kinopoisk-images/10768063/b1cbc945-b803-4ac6-b6ae-e036056431a6/600x900`
    })
    @IsNotEmpty({message: 'Значение не должно быть пустым'})
    poster: string;
}