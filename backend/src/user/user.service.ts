import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getMe() {
    return { msg: 'This will return user profile info' };
  }
}
// This service contains the business logic for user-related operations.
// It currently has a single method, `getMe`, which returns a placeholder message.
// In a real application, this method would typically retrieve the user's profile information from the database.
