import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createShowDto{
    @IsString()
    @IsNotEmpty()
    date: string

    @IsArray()
    @IsNotEmpty()
    time: JSON[]
}