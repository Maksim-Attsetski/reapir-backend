import { Controller, Post, Body, Res, Get, Req } from '@nestjs/common';
import { Errors } from 'src/utils';

import { AuthService, IAuthResponse } from './auth.service';
import { LoginUserDto, CreateUserDto } from 'src/api';

@Controller('auth')
export class AuthController {
  cookieOptions: any;
  constructor(private readonly authService: AuthService) {
    this.cookieOptions = {
      maxAge: 24 * 60 * 60 * 1000 * 30,
      httpOnly: true,
    };
  }

  setCookies(data: IAuthResponse, res) {
    if (data?.tokens?.refreshToken) {
      res?.cookie('refreshToken', data.tokens.refreshToken, this.cookieOptions);
      return { ...data, tokens: data.tokens.accessToken };
    } else {
      throw Errors.undefinedError();
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto, @Res({ passthrough: true }) res) {
    const data: IAuthResponse = await this.authService.login(loginDto);
    return this.setCookies(data, res);
  }

  @Get('refresh')
  async refresh(@Req() req, @Res({ passthrough: true }) res) {
    const refreshToken = req.cookies?.refreshToken;

    const data: IAuthResponse = await this.authService.refresh(refreshToken);
    return this.setCookies(data, res);
  }

  @Post('signup')
  async signup(
    @Body() signupDto: CreateUserDto,
    @Res({ passthrough: true }) res,
  ) {
    const data: IAuthResponse = await this.authService.signup(signupDto);
    return this.setCookies(data, res);
  }

  @Post('google')
  async authByGoogle(
    @Body() { credential }: { credential: string },
    @Res({ passthrough: true }) res,
  ) {
    const data: IAuthResponse = await this.authService.authByGoogle(credential);
    return this.setCookies(data, res);
  }

  @Get('logout')
  async logout(@Req() req, @Res({ passthrough: true }) res) {
    const { refreshToken } = req.cookies;
    res.clearCookie('refreshToken');

    await this.authService.deleteToken({ refreshToken });
    return true;
  }
}
