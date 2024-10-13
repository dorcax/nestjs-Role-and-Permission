import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import{ConfigService} from "@nestjs/config"
@Injectable()


export class AuthGuard implements CanActivate{
    constructor(private jwtService: JwtService,
        private configService :ConfigService

    ){}
    async canActivate(context: ExecutionContext):  Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = this.ExtractfromHeader(request)
        if(!token){
            throw new UnauthorizedException("no token found")
        }
        try {
            const payload =await this.jwtService.verifyAsync(token,{secret:this.configService.get<string>("JWT_SECRET")})
            console.log(payload)
        if(!payload){
            throw new UnauthorizedException("invalid Credentials")
        }
        request.user =payload
        console.log("User in AuthGuard:", request.user); // Inside AuthGuard
        } catch (error) {
            console.log(error.message)
            throw new UnauthorizedException("invalid credentials")
        }
        return true
        
    }
    private ExtractfromHeader(request:Request):string|undefined{
        // const authHeader = request.headers.authorization;
        const authHeader=request.headers.authorization;

        if(authHeader && authHeader.startsWith("Bearer ")){
            return authHeader.split(" ")[1]

        }
    return undefined

    }

    

}