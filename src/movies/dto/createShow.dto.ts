import { IsNotEmpty, IsString } from "class-validator";

export class createShowDto{
    @IsString()
    @IsNotEmpty()
    date: string

    @IsString()
    @IsNotEmpty()
    time: string
}