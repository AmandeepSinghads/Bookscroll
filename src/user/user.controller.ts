import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/Guards';
import { GetUser } from 'src/auth/decorator';

@Controller('users')
export class UserController {
  //separate guard folder for adding authguard
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
}
