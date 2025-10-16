import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { LoggingMiddleware } from './common/middlewares/logger.middleware';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma/prisma.service';
import { CacheModule } from '@nestjs/cache-manager';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [CacheModule.register({
    isGlobal: true
  }), ConfigModule.forRoot({
    isGlobal: true
  }), AuthModule, PrismaModule, MoviesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggingMiddleware).forRoutes('*')
  }
}
