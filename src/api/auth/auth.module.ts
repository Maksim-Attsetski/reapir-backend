import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from 'src/api';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenSchema, Token } from './auth.entity';
import { GoogleStrategy } from './strategy/google';

export const TokenModel = MongooseModule.forFeature([
  { name: Token.name, schema: TokenSchema },
]);

@Module({
  imports: [JwtModule, TokenModel, forwardRef(() => UsersModule)],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
  exports: [TokenModel, AuthService],
})
export class AuthModule {}
