import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { ConfigService } from '@nestjs/config';
import { UserService } from '@modules/user/user.service';
import { UserEntity } from '@modules/user/entities/user.entity';
import { AppConfig } from '@config/app.config';
import { JwtPayload } from './interface/jwt-payload.interface';
import { LoginResponseDto, LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  private authSecret: string;
  private jwtTokenExpiresIn: string;

  constructor(
    private readonly configService: ConfigService<AppConfig>,
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {
    this.authSecret = this.configService.get('auth_secret');
    this.jwtTokenExpiresIn = this.configService.get('jwt_token_expires_in');
  }

  async signIn(loginAttempt: LoginUserDto): Promise<LoginResponseDto> {
    const INCORRECT_EMAIL_OR_PASSWORD = 'incorrect email or password';

    const userToAttempt = await this.userService.findUserByEmail(
      loginAttempt.email,
    );

    if (!userToAttempt) {
      throw new NotFoundException(INCORRECT_EMAIL_OR_PASSWORD);
    }

    let isMatch = false;
    try {
      isMatch = await this.checkPassword(
        loginAttempt.password,
        userToAttempt.password,
      );
    } catch (error) {
      throw new UnauthorizedException(INCORRECT_EMAIL_OR_PASSWORD);
    }

    if (isMatch) {
      return this.createJwtPayload(userToAttempt);
    } else {
      throw new UnauthorizedException(INCORRECT_EMAIL_OR_PASSWORD);
    }
  }

  private checkPassword(
    attempt: string,
    userPassword: string,
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(attempt, userPassword, (err, isMatch) => {
        if (err) return reject(err);
        resolve(isMatch);
      });
    });
  }

  private async createJwtPayload(user: UserEntity) {
    const data: JwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const jwt = this.jwtService.sign(data, {
      expiresIn: this.jwtTokenExpiresIn,
    });

    return {
      token: jwt,
      data,
    };
  }

  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token, { secret: this.authSecret });
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
