import { Injectable } from '@nestjs/common';
import { CreateReminderDateDto } from './dto/create-reminder-date.dto';
import { UpdateReminderDateDto } from './dto/update-reminder-date.dto';

@Injectable()
export class ReminderDateService {
  create(createReminderDateDto: CreateReminderDateDto) {
    return 'This action adds a new reminderDate';
  }

  findAll() {
    return `This action returns all reminderDate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reminderDate`;
  }

  update(id: number, updateReminderDateDto: UpdateReminderDateDto) {
    return `This action updates a #${id} reminderDate`;
  }

  remove(id: number) {
    return `This action removes a #${id} reminderDate`;
  }
}
