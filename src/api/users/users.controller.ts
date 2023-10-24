import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { IQuery } from 'src/utils';
import { AuthGuard } from 'src/guards';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query() query: IQuery) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('isFull') isFull: boolean) {
    return this.usersService.findOne(id, isFull);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/password')
  updatePassword(
    @Param('id') id: string,
    @Body() updateUserDto: { last: string; new: string },
  ) {
    return this.usersService.updatePassword(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req,
  ) {
    return this.usersService.update(id, updateUserDto, req.user?._id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
