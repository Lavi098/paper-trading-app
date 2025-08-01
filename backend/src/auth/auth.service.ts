/* eslint-disable prettier/prettier */
import {
  Injectable,
  ConflictException,
  
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../database/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

// Utility type for strong Prisma return typing
type UserType = Awaited<ReturnType<PrismaService['user']['findUnique']>>;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async signup(dto: SignupDto): Promise<{ access_token: string }> {
    const existingUser: UserType = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    const password: string = dto.password;
    const hashedPassword = (await bcrypt.hash(password, 10));

    const user: UserType = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        name: '', // Optional field; provide input in actual signup if required
      },
    });

    const access_token: string = await this.generateToken(user);

    return { access_token };
  }

  async login(dto: LoginDto): Promise<{ access_token: string }> {
    const user: UserType = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const access_token: string = await this.generateToken(user);

    return { access_token };
  }

  private async generateToken(user: { id: number; email: string }): Promise<string> {
    const payload = { sub: user.id, email: user.email };
    return this.jwt.signAsync(payload, {
      expiresIn: '1h',
    });
  }
}
// This service handles user authentication, including signup and login.
// It uses Prisma to interact with the database and bcrypt for password hashing.
// The `signup` method checks if the user already exists, hashes the password, and creates a new user.
// The `login` method verifies the user's credentials and generates a JWT token if successful.
// The `generateToken` method creates a JWT token with the user's ID and email, which is used for subsequent authenticated requests.  