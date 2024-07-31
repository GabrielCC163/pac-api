import { Roles } from '@common/decorators/roles.decorator';
import { UserRoleEnum } from '@modules/user/entities/user.entity';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesByRoute =
      this.reflector.getAllAndOverride<UserRoleEnum[]>('roles', [
        context.getHandler(),
        context.getClass(),
      ]) || [];
    const roles: UserRoleEnum[] = Array.from(new Set(rolesByRoute).values());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return user && roles.includes(user.role);
  }
}
