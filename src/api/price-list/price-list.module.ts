import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PriceListService } from './price-list.service';
import { PriceListController } from './price-list.controller';
import { PriceList, priceListSchema } from './price-list.entity';

const priceListModel = MongooseModule.forFeature([
  { name: PriceList.name, schema: priceListSchema },
]);

@Module({
  imports: [priceListModel],
  controllers: [PriceListController],
  providers: [PriceListService],
})
export class PriceListModule {}
