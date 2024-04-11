import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { dot } from "node:test/reporters";

@Controller('auth')
export class AuthController{
    constructor(private authService:AuthService){}
    @Post('signup')
    Signup(@Body() dto:AuthDto){
        return  this.authService.signUp(dto);
      }
    @Post('signin')
    Signin(@Body() dto:AuthDto){
        return this.authService.signIn(dto);
    }  
}
