import { Module } from '@nestjs/common';

import { DailyExpensesModule } from './daily-expenses/daily-expenses.module';
import { ItemsModule } from './items/items.module';
import { PrismaService } from './prisma/prisma.service';
import { ProductsModule } from './products/products.module';
import { ReminderDateModule } from './reminder-date/reminder-date.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    ProductsModule,
    UserModule,
    ItemsModule,
    ReminderDateModule,
    DailyExpensesModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
