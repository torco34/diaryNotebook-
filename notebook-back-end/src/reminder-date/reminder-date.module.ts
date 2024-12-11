import { Module } from '@nestjs/common';
import { ReminderDateService } from './reminder-date.service';
import { ReminderDateController } from './reminder-date.controller';

@Module({
  controllers: [ReminderDateController],
  providers: [ReminderDateService],
})
export class ReminderDateModule {}
