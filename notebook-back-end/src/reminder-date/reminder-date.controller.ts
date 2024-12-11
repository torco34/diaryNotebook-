import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateReminderDateDto } from './dto/create-reminder-date.dto';
import { UpdateReminderDateDto } from './dto/update-reminder-date.dto';
import { ReminderDateService } from './reminder-date.service';

@Controller('reminder-date')
export class ReminderDateController {
  constructor(private readonly reminderDateService: ReminderDateService) {}

  @Post()
  create(@Body() createReminderDateDto: CreateReminderDateDto) {
    return this.reminderDateService.create(createReminderDateDto);
  }

  @Get()
  findAll() {
    return this.reminderDateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reminderDateService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReminderDateDto: UpdateReminderDateDto,
  ) {
    return this.reminderDateService.update(+id, updateReminderDateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reminderDateService.remove(+id);
  }
}
