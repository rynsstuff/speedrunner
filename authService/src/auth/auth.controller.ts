import { Body, Controller, Post, UseGuards, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/auth.guard';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller() 
export class AuthController {
  constructor(private authService: AuthService) {}

  
  @Post('auth/register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

 
  @Post('auth/login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  
  @UseGuards(JwtAuthGuard)
  @Get('users/:id/profile')
  getProfile(@Param('id') id: string) {
    return this.authService.getProfile(id);
  }
}