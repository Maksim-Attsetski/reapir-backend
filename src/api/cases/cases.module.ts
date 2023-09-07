import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { CasesService } from './cases.service';
import { CasesController } from './cases.controller';
import { Cases, CasesSchema } from './cases.entity';

const newsModel = MongooseModule.forFeature([
  { name: Cases.name, schema: CasesSchema },
]);

@Module({
  imports: [newsModel],
  controllers: [CasesController],
  providers: [CasesService],
})
export class CasesModule {}
