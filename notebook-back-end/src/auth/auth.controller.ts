import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('/api/auth/login')
  login() {
    return 'Login';
  }
  @Post('/api/auth/register')
  register() {
    return 'Register';
  }
}
