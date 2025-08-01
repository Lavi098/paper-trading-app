// src/auth/guards/jwt-auth.guard.ts

import { Injectable } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
// This guard uses Passport's JWT strategy to protect routes.
// It ensures that only requests with a valid JWT token can access the protected routes.
// If the token is valid, the user information will be available in req.user.
// If the token is invalid or missing, it will throw an UnauthorizedException.
// This guard can be applied to controllers or specific routes to enforce authentication.

// It is typically used in conjunction with the JwtStrategy defined in the auth module.
// The JwtAuthGuard can be used to protect routes that require user authentication.
