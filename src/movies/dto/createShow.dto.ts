import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IShow, ITicket } from "../interfaces/createTicket.interface";
import { ApiProperty } from "@nestjs/swagger";

export class createShowDto{
    @IsString()
    @IsNotEmpty()
    date: string

    @IsArray()
    @IsNotEmpty()
    time: IShow[]
}

export class bookATicket{
    @ApiProperty({
        title: "Время показа",
        example: `12:00`
    })
    @IsString()
    @IsNotEmpty()
    time: string

    @ApiProperty({
        title: "Информация о билетах",
        example: `[
		{
			"row": 0,
			"place": 1
		},
		{
			"row": 0,
			"place": 2
		}
	]`
    })
    @IsArray()
    @IsNotEmpty()
    tickets: ITicket[]
}

export class getTime{
    @ApiProperty({
        title: "Время показа",
        example: `12:00`
    })
    @IsString()
    @IsNotEmpty()
    time: String
}