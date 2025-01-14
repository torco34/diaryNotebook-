import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationService } from './notification-service/notification-service.service';
import { SpecialDatesController } from './special-date.controller';
import { SpecialDatesService } from './special-date.service';

@Module({
  controllers: [SpecialDatesController],
  providers: [SpecialDatesService, NotificationService, PrismaService],
})
export class SpecialDateModule {}
