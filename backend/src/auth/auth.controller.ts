import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto): Promise<{ access_token: string }> {
    return this.authService.signup(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto): Promise<{ access_token: string }> {
    return this.authService.login(dto);
  }
}
