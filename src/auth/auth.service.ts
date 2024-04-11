import { Body, ForbiddenException, Injectable } from "@nestjs/common";
import { User,Bookmark, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon2 from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class AuthService {
    constructor(private prismaService:PrismaService){}
    async signIn(dto:AuthDto) {
        
        const user = await this.prismaService.user.findUnique({
                where : {
                    email : dto.email
                },
        });
        if(!user) throw new ForbiddenException('Credentials incorrect',);
        //compare passwords
        const pwMatches = await argon2.verify(user.hash,dto.password);
        if(!pwMatches)  throw new ForbiddenException('Credentials incorrect',);
        delete user.hash;
        return user;
        //if user does nnot exist throw exception
        //compare pqassword
        //if password doesnt match throw forbidden eror

       
        
    }
    async signUp(dto:AuthDto) {
        //genettate hash
        const hash = await argon2.hash(dto.password);
        //save user to db
        try{
            const user = await this.prismaService.user.create({
                data:{
                    email: dto.email,
                    hash,
                }
    
            })
        
            delete  user.hash;
            return user;
        }catch(error){
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002')
                    {
                        throw new ForbiddenException('Credentials taken')
                    }
            }
        }
        
    }




}