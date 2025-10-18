import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class OkDto{
    @ApiProperty({
            title: "Главный фильм (только 1 шт.)",
            example: `[{
			"id": 8489718,
			"name": "Лёша из Лавры. Погребающий странных",
			"alternativeName": null,
			"type": "movie",
			"typeNumber": 1,
			"year": 2025,
			"description": "История о подвиге и трагической гибели молодого монаха из Троице-Сергиевой Лавры, который посвятил свою жизнь погребению одиноких бездомных людей — тех, кого в Церкви называют «странными».",
			"shortDescription": "Кто позаботится об умерших бездомных? Проникновенный док о монахе-энтузиасте",
			"status": null,
			"rating": {
				"kp": 8.849,
				"imdb": 0,
				"filmCritics": 0,
				"russianFilmCritics": 0,
				"await": null
			},
			"votes": {
				"kp": 2431,
				"imdb": 0,
				"filmCritics": 0,
				"russianFilmCritics": 0,
				"await": 0
			},
			"movieLength": 92,
			"totalSeriesLength": null,
			"seriesLength": null,
			"ratingMpaa": null,
			"ageRating": 16,
			"poster": {
				"url": "https://image.openmoviedb.com/kinopoisk-images/9784475/87b40574-4091-4377-a769-7a229f172242/600x900",
				"previewUrl": "https://image.openmoviedb.com/kinopoisk-images/9784475/87b40574-4091-4377-a769-7a229f172242/300x450"
			},
			"backdrop": {
				"url": "https://image.openmoviedb.com/kinopoisk-ott-images/13051577/2a0000019909a395228b2191ddf919f23248/1344x756",
				"previewUrl": "https://image.openmoviedb.com/kinopoisk-ott-images/13051577/2a0000019909a395228b2191ddf919f23248/678x380"
			},
			"genres": [
				{
					"name": "документальный"
				},
				{
					"name": "биография"
				}
			],
			"countries": [
				{
					"name": "Россия"
				}
			],
			"isSeries": false,
			"ticketsOnSale": false
    }]`
    })
    @IsNotEmpty({message: 'Значение не должно быть пустым'})
    main: [];

    @ApiProperty({
            title: "Популярные фильмы (20 шт.)",
            example: `[{
			"id": 8489718,
			"name": "Лёша из Лавры. Погребающий странных",
			"alternativeName": null,
			"type": "movie",
			"typeNumber": 1,
			"year": 2025,
			"description": "История о подвиге и трагической гибели молодого монаха из Троице-Сергиевой Лавры, который посвятил свою жизнь погребению одиноких бездомных людей — тех, кого в Церкви называют «странными».",
			"shortDescription": "Кто позаботится об умерших бездомных? Проникновенный док о монахе-энтузиасте",
			"status": null,
			"rating": {
				"kp": 8.849,
				"imdb": 0,
				"filmCritics": 0,
				"russianFilmCritics": 0,
				"await": null
			},
			"votes": {
				"kp": 2431,
				"imdb": 0,
				"filmCritics": 0,
				"russianFilmCritics": 0,
				"await": 0
			},
			"movieLength": 92,
			"totalSeriesLength": null,
			"seriesLength": null,
			"ratingMpaa": null,
			"ageRating": 16,
			"poster": {
				"url": "https://image.openmoviedb.com/kinopoisk-images/9784475/87b40574-4091-4377-a769-7a229f172242/600x900",
				"previewUrl": "https://image.openmoviedb.com/kinopoisk-images/9784475/87b40574-4091-4377-a769-7a229f172242/300x450"
			},
			"backdrop": {
				"url": "https://image.openmoviedb.com/kinopoisk-ott-images/13051577/2a0000019909a395228b2191ddf919f23248/1344x756",
				"previewUrl": "https://image.openmoviedb.com/kinopoisk-ott-images/13051577/2a0000019909a395228b2191ddf919f23248/678x380"
			},
			"genres": [
				{
					"name": "документальный"
				},
				{
					"name": "биография"
				}
			],
			"countries": [
				{
					"name": "Россия"
				}
			],
			"isSeries": false,
			"ticketsOnSale": false
    }, ...]`
    })
    @IsNotEmpty({message: 'Значение не должно быть пустым'})
    popular: [];

    @ApiProperty({
            title: "Все фильмы (50 шт.)",
            example: `[{
			"id": 8489718,
			"name": "Лёша из Лавры. Погребающий странных",
			"alternativeName": null,
			"type": "movie",
			"typeNumber": 1,
			"year": 2025,
			"description": "История о подвиге и трагической гибели молодого монаха из Троице-Сергиевой Лавры, который посвятил свою жизнь погребению одиноких бездомных людей — тех, кого в Церкви называют «странными».",
			"shortDescription": "Кто позаботится об умерших бездомных? Проникновенный док о монахе-энтузиасте",
			"status": null,
			"rating": {
				"kp": 8.849,
				"imdb": 0,
				"filmCritics": 0,
				"russianFilmCritics": 0,
				"await": null
			},
			"votes": {
				"kp": 2431,
				"imdb": 0,
				"filmCritics": 0,
				"russianFilmCritics": 0,
				"await": 0
			},
			"movieLength": 92,
			"totalSeriesLength": null,
			"seriesLength": null,
			"ratingMpaa": null,
			"ageRating": 16,
			"poster": {
				"url": "https://image.openmoviedb.com/kinopoisk-images/9784475/87b40574-4091-4377-a769-7a229f172242/600x900",
				"previewUrl": "https://image.openmoviedb.com/kinopoisk-images/9784475/87b40574-4091-4377-a769-7a229f172242/300x450"
			},
			"backdrop": {
				"url": "https://image.openmoviedb.com/kinopoisk-ott-images/13051577/2a0000019909a395228b2191ddf919f23248/1344x756",
				"previewUrl": "https://image.openmoviedb.com/kinopoisk-ott-images/13051577/2a0000019909a395228b2191ddf919f23248/678x380"
			},
			"genres": [
				{
					"name": "документальный"
				},
				{
					"name": "биография"
				}
			],
			"countries": [
				{
					"name": "Россия"
				}
			],
			"isSeries": false,
			"ticketsOnSale": false
    }, ...]`
    })
    @IsNotEmpty({message: 'Значение не должно быть пустым'})
    all: [];
}