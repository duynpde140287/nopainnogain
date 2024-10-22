/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthClientService } from './auth-client.service';
import { RegisterClientDto } from './dto/register-client.dto';
import { LocalAuthClientGuard } from './guards/local-auth-client.guard';
import { JwtAuthClientGuard } from './guards/jwt-auth-client.guard';

@Controller('auth-client')
export class AuthClientController {
  constructor(private readonly authService: AuthClientService) {}

  @UseGuards(LocalAuthClientGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() { username, password, email }: RegisterClientDto) {
    return this.authService.register(username, password, email);
  }

  @UseGuards(JwtAuthClientGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
