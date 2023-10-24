import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { CasesService } from './cases.service';
import { CasesController } from './cases.controller';
import { Cases, CasesSchema } from './cases.entity';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/api/users/users.module';

const newsModel = MongooseModule.forFeature([
  { name: Cases.name, schema: CasesSchema },
]);

@Module({
  imports: [newsModel, UserModel],
  controllers: [CasesController],
  providers: [CasesService, JwtService],
})
export class CasesModule {}
