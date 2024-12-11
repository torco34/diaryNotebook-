import { PartialType } from '@nestjs/swagger';

import { CreateReminderDateDto } from './create-reminder-date.dto';

export class UpdateReminderDateDto extends PartialType(CreateReminderDateDto) {}
