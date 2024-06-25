import { UserTypeEnum } from '@modules/user/entities/user.entity';

export interface JwtPayload {
  sub: string;
  document: string;
  name: string;
  type: UserTypeEnum;
}
