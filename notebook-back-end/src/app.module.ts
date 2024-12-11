import { Module } from '@nestjs/common';

import { ItemsModule } from './items/items.module';
import { PrismaService } from './prisma/prisma.service';
import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';
import { ReminderDateModule } from './reminder-date/reminder-date.module';
@Module({
  imports: [ProductsModule, UserModule, ItemsModule, ReminderDateModule],
  providers: [PrismaService],
})
export class AppModule {}
