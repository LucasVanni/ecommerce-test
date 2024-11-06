import { Body, Controller, Post, Put } from '@nestjs/common';
import { LoginUserDto } from '../users/dto/users.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('recovery-password')
  async recoveryPassword(
    @Body() body: { email: string; recoveryLink: string },
  ) {
    return this.authService.recoveryPassword(body.email, body.recoveryLink);
  }

  @Put('reset-password')
  async resetPassword(@Body() body: { token: string; password: string }) {
    return this.authService.resetPassword(body.token, body.password);
  }
}
