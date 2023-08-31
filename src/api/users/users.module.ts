import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users, UsersSchema } from './users.entity';

const UserModel = MongooseModule.forFeature([
  { name: Users.name, schema: UsersSchema },
]);

@Module({
  imports: [UserModel],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UserModel],
})
export class UsersModule {}
