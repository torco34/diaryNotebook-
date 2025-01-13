import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { DailyExpensesController } from './daily-expenses.controller';
import { DailyExpensesService } from './daily-expenses.service';

@Module({
  controllers: [DailyExpensesController],
  providers: [DailyExpensesService, PrismaService], // Asegúrate de que PrismaService está en los providers
})
export class DailyExpensesModule {}
