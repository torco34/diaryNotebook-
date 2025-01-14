import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
  get dailyExpense() {
    return this.dailyExpense;
  }
  get pendingPurchase() {
    return this.pendingPurchase;
  }

  get specialDate() {
    return this.specialDate;
  }
  get promotion() {
    return this.promotion;
  }
}
