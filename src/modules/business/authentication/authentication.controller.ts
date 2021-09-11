import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { transformTo } from '@util/transform-to.util';

import { LoginResultDto } from '@business/authentication/dto/output/login.result.dto';
import { ApiRoute } from '@decorators/api-route';

import { AuthenticationService } from './authentication.service';
import { LoginBodyDto } from './dto/input/login.body.dto';

@Controller('authentication')
@ApiTags('Users')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  @ApiBody({ description: 'The user credentials', type: LoginBodyDto })
  @ApiRoute({
    summary: 'Login route',
    description: 'Authenticates a user from his google auth token',
    created: { type: LoginResultDto, description: 'Authentication succeeded' },
  })
  async login(@Body() { token }: LoginBodyDto) {
    const appToken = await this.authenticationService.validateUser(token);

    return transformTo(LoginResultDto, { token: appToken });
  }
}
