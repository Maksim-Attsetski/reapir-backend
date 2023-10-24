import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PriceListService } from './price-list.service';
import { PriceListController } from './price-list.controller';
import { PriceList, priceListSchema } from './price-list.entity';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from '../users/users.module';

const priceListModel = MongooseModule.forFeature([
  { name: PriceList.name, schema: priceListSchema },
]);

@Module({
  imports: [priceListModel, UserModel],
  controllers: [PriceListController],
  providers: [PriceListService, JwtService],
})
export class PriceListModule {}
