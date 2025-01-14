import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateSpecialDateDto } from './dto/create-special-date.dto';
import { UpdateSpecialDateDto } from './dto/update-special-date.dto';
import { SpecialDatesService } from './special-date.service';

@Controller('special-dates')
export class SpecialDatesController {
  constructor(private readonly specialDatesService: SpecialDatesService) {}

  @Post()
  create(@Body() createSpecialDateDto: CreateSpecialDateDto) {
    return this.specialDatesService.create(createSpecialDateDto);
  }

  @Get()
  findAll() {
    return this.specialDatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specialDatesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSpecialDateDto: UpdateSpecialDateDto,
  ) {
    return this.specialDatesService.update(id, updateSpecialDateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specialDatesService.remove(id);
  }
}
