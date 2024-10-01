import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
@Injectable()


export class AuthGuard implements CanActivate{
    constructor(private jwtService: JwtService){}
    async canActivate(context: ExecutionContext):  Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = this.ExtractfromHeader(request)
        if(token){
            throw new UnauthorizedException("invalid credential")
        }
        try {
            const payload =await this.jwtService.verifyAsync(token)
        if(!payload){
            throw new UnauthorizedException("invalid Credentials")
        }
        request.user =payload
        } catch (error) {
            throw new UnauthorizedException("invalid credentials")
        }
        return true
        
    }
    private ExtractfromHeader(request:Request):string|undefined{
        // const authHeader = request.headers.authorization;
        const authHeader=request.headers.authorization;

        if(authHeader && authHeader.startsWith("Bearer ")){
            return authHeader.split("")[1]

        }
    return undefined

    }

    

}