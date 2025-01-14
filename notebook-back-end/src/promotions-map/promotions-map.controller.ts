import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { CreatePromotionsMapDto } from './dto/create-promotions-map.dto';
import { UpdatePromotionsMapDto } from './dto/update-promotions-map.dto';
import { PromotionsMapService } from './promotions-map.service';

@Controller('promotions-map')
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsMapService) {}

  @Post()
  async create(@Body() createPromotionDto: CreatePromotionsMapDto) {
    return this.promotionsService.create(createPromotionDto);
  }

  @Get()
  async findAll(@Query('category') category?: string) {
    return this.promotionsService.findAll(category);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.promotionsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePromotionDto: UpdatePromotionsMapDto,
  ) {
    return this.promotionsService.update(id, updatePromotionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.promotionsService.remove(id);
  }
}
