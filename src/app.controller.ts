import { Body, Controller, Delete, Get, Headers, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Authorization } from './auth/decorators/authorization.decorator';
import { Authorized } from './auth/decorators/authorized.decorator';
import { User } from 'prisma/generated/prisma/client';
import { Request } from 'express';
import { ApiAcceptedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  @Authorization()
  getHello(){
    return this.appService.getHello();
  }
}
