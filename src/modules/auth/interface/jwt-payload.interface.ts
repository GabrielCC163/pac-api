import { UserRoleEnum } from '@modules/user/entities/user.entity';

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRoleEnum;
}
