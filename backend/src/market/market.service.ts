/* eslint-disable prettier/prettier */
// eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MarketService {
  async fetchOptionChain(symbol: string) {
    try {
      const res = await axios.get(
        `https://www.nseindia.com/api/option-chain-indices?symbol=${symbol.toUpperCase()}`,
        {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/113.0.0.0 Safari/537.36',
            'Accept': 'application/json',
            'Referer': 'https://www.nseindia.com/',
          },
        },
      );

      return res.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException('Failed to fetch option chain', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
