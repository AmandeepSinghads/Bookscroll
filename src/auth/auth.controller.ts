import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  Signup(@Body() dto: AuthDto) {
    return this.authService.signUp(dto);
  }
  //since signin doesnt use any resouces so returning a http status ok code seems optimal
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  Signin(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }
}
