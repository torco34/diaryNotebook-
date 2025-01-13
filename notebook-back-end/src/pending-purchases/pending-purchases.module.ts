import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { PendingPurchasesController } from './pending-purchases.controller';
import { PendingPurchasesService } from './pending-purchases.service';

@Module({
  controllers: [PendingPurchasesController],
  providers: [PendingPurchasesService, PrismaService],
})
export class PendingPurchasesModule {}
