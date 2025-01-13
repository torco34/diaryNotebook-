import { Module } from '@nestjs/common';

import { DailyExpensesModule } from './daily-expenses/daily-expenses.module';
import { ItemsModule } from './items/items.module';
import { PrismaService } from './prisma/prisma.service';
import { ProductsModule } from './products/products.module';
import { ReminderDateModule } from './reminder-date/reminder-date.module';
import { UserModule } from './user/user.module';
import { PendingPurchasesModule } from './pending-purchases/pending-purchases.module';
@Module({
  imports: [
    ProductsModule,
    UserModule,
    ItemsModule,
    ReminderDateModule,
    DailyExpensesModule,
    PendingPurchasesModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
