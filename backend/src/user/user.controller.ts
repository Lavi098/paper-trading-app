import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getMe() {
    return this.userService.getMe();
  }
}
// This controller handles user-related HTTP requests.
// It defines a single route, `GET /user`, which retrieves the current user's information.
