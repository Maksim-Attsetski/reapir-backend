import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { Injectable } from '@nestjs/common';

const redirect = 'http://localhost:3000/redirect/google';
// const callbackURL = 'http://localhost:50';
const callbackURL = 'http://localhost:5000/api/auth/google/redirect';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: callbackURL,
      redirect,
      scope: ['email', 'profile'],
    });
  }

  authorizationParams(options: any): object {
    console.log(options);

    return {
      ...options,
      response_type: 'code',
      prompt: 'consent',
      access_type: 'offline',
    };
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    console.log(profile);

    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
      refreshToken,
    };

    done(null, user);
  }
}
