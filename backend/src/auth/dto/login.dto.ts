import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}

// This DTO is used for user login.
// It validates the email and password fields using class-validator decorators.
// The email must be a valid email format, and the password must be a non-empty string with a minimum length of 6 characters.
// This ensures that the data received from the client is in the correct format before processing it in the authentication service.
