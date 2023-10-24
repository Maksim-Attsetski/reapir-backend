import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PriceListService } from './price-list.service';
import { CreatePriceListDto } from './dto/create-price-list.dto';
import { UpdatePriceListDto } from './dto/update-news.dto';
import { IQuery } from 'src/utils';
import { RoleGuard } from 'src/guards';

@Controller('price-list')
export class PriceListController {
  constructor(private readonly priceListService: PriceListService) {}

  @UseGuards(RoleGuard)
  @Post()
  async create(@Body() createPriceListDto: CreatePriceListDto) {
    return this.priceListService.create(createPriceListDto);
  }

  @Get()
  findAll(@Query() query: IQuery) {
    return this.priceListService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.priceListService.findOne(id);
  }

  @UseGuards(RoleGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePriceListDto: UpdatePriceListDto,
  ) {
    return this.priceListService.update(id, updatePriceListDto);
  }

  @UseGuards(RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.priceListService.remove(id);
  }
}
