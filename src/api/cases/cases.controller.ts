import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { CasesService } from './cases.service';
import { CreateCasesDto } from './dto/create-cases.dto';
import { UpdateCasesDto } from './dto/update-cases.dto';
import { IQuery } from 'src/utils';

import { IFile } from 'src/modules/files';

@Controller('cases')
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 10))
  async create(
    @UploadedFiles() files: IFile[],
    @Body() createCasesDto: CreateCasesDto,
  ) {
    return this.casesService.create(createCasesDto, files);
  }

  @Get()
  findAll(@Query() query: IQuery) {
    return this.casesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.casesService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('files', 10))
  update(
    @Param('id') id: string,
    @Body() updateCasesDto: UpdateCasesDto,
    @UploadedFiles() files?: IFile[],
  ) {
    return this.casesService.update(id, updateCasesDto, files);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.casesService.remove(id);
  }
}
