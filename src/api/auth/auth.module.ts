import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from 'src/api';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenSchema, Token } from './auth.entity';

const TokenModel = MongooseModule.forFeature([
  { name: Token.name, schema: TokenSchema },
]);

@Module({
  imports: [JwtModule, TokenModel, UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [TokenModel],
})
export class AuthModule {}
