import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponseDto, LoginUserDto } from './dto/login-user.dto';

import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { IsPublic } from '@common/decorators/ispublic.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('signin')
  @ApiCreatedResponse({
    type: LoginResponseDto,
  })
  async signIn(@Body() loginAttempt: LoginUserDto): Promise<LoginResponseDto> {
    return await this.authService.signIn(loginAttempt);
  }
}
