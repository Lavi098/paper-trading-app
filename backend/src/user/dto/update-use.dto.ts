import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  bio?: string;
}
// This DTO is used for updating user information.
// It allows optional fields for email, name, and bio, ensuring that if provided, they meet the specified validation criteria.
