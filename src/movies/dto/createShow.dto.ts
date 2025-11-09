import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IShow, ITicket } from "../interfaces/createTicket.interface";

export class createShowDto{
    @IsString()
    @IsNotEmpty()
    date: string

    @IsArray()
    @IsNotEmpty()
    time: IShow[]
}

export class bookATicket{
    @IsString()
    @IsNotEmpty()
    time: String
    
    @IsArray()
    @IsNotEmpty()
    tickets: ITicket[]
}