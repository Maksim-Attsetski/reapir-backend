import { PriceListService } from './price-list.service';
import { PriceListController } from './price-list.controller';
import { PriceListModule } from './price-list.module';
import { CreatePriceListDto } from './dto/create-price-list.dto';
import { UpdatePriceListDto } from './dto/update-news.dto';
import { GetPriceListDto } from './dto/get-news.dto';
export * from './price-list.entity';

export {
  PriceListService,
  PriceListController,
  PriceListModule,
  // dto
  CreatePriceListDto,
  UpdatePriceListDto,
  GetPriceListDto,
};
