import{Injectable,CanActivate,ExecutionContext,UnauthorizedException} from "@nestjs/common"
import {Reflector} from "@nestjs/core"
import { Role} from "../user/entities/role.enum"

@Injectable()

export class RolesGuard implements CanActivate{
    constructor(private reflector:Reflector){}
  canActivate(context:ExecutionContext):boolean{
    // what is the required role?
    const requiredRoles=this.reflector.getAllAndOverride<Role[]>("roles",[
      context.getHandler(),
      context.getClass()
    ]) 
    if(!requiredRoles){
      return true
    }
    // Get the user from the request object
    const {user} =context.switchToHttp().getRequest()
    console.log("User in RolesGuard:", user);

     // Ensure user is present
     if (!user) {
      throw new UnauthorizedException("User not authenticated");
    }
    console.log(user)
    // is at least one of the require roles a role that the user is amking
       return requiredRoles.some((role)=>user.role.includes(role))


  
  }
}