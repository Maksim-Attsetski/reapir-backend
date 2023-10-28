import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';

import { Errors } from 'src/utils';
import { LoginUserDto, CreateUserDto } from 'src/api';
import { AuthService, IAuthResponse } from './auth.service';

@Controller('auth')
export class AuthController {
  cookieOptions: any;
  constructor(private readonly authService: AuthService) {}

  setCookies(data: IAuthResponse, res: any) {
    if (data?.tokens?.refreshToken) {
      res?.cookie('refreshToken', data.tokens.refreshToken, {
        maxAge: 24 * 60 * 60 * 1000 * 7,
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      });
      return { ...data, tokens: data.tokens.accessToken };
    } else {
      throw Errors.undefinedError();
    }
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginUserDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res,
  ) {
    const data: IAuthResponse = await this.authService.login(
      loginDto,
      req.headers['user-agent'],
    );
    return this.setCookies(data, res);
  }

  @Get('tokens') // TODO delete on release
  async tokens() {
    return await this.authService.getTokens();
  }

  @Get('refresh')
  async refresh(@Req() req, @Res({ passthrough: true }) res) {
    const refreshToken = req.cookies?.refreshToken;

    const data: IAuthResponse = await this.authService.refresh(
      refreshToken,
      req.headers['user-agent'],
    );
    return this.setCookies(data, res);
  }

  @Post('signup')
  async signup(
    @Body() signupDto: CreateUserDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res,
  ) {
    const data: IAuthResponse = await this.authService.signup(
      signupDto,
      req.headers['user-agent'],
    );
    return this.setCookies(data, res);
  }

  @Get('google')
  @UseGuards(NestAuthGuard('google'))
  async googleAuth() {
    return 'success';
  }

  @Get('google/redirect')
  @UseGuards(NestAuthGuard('google'))
  async authByGoogle(@Req() req: any, @Res() res: any) {
    try {
      if (!req.user || !req?.query?.code) return 'No user from google';
      const user = req?.user as any;

      await this.authService.signup(
        {
          email: user?.email,
          first_name: user?.first_name,
          last_name: user?.last_name,
          providers: ['google'],
        },
        req.headers['user-agent'] ?? 'google-account',
      );

      res.redirect(
        `http://localhost:3000/redirect/google?email=${req?.user?.email ?? ''}`,
      );
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  @Get('logout')
  async logout(@Req() req, @Res({ passthrough: true }) res) {
    const { refreshToken } = req.cookies;
    res.clearCookie('refreshToken');

    await this.authService.deleteToken({ refreshToken });
    return true;
  }
}
