/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './database/prisma.service';
import { MarketModule } from './market/market.module';
@Module({
  imports: [
    MarketModule,


    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({}),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}