import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
// This module defines the UserModule for managing user-related operations.
// It includes the UserController for handling HTTP requests related to users and the UserService for business logic.
