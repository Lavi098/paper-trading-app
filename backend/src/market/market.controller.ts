/* eslint-disable prettier/prettier */
import { Controller, Get,  Query } from '@nestjs/common';
import { MarketService } from './market.service';

@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

@Get('option-chain')
getOptionChain(@Query('symbol') symbol: string) {
return this.marketService.fetchOptionChain(symbol);
  }
}
