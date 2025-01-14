import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { PromotionsController } from './promotions-map.controller';
import { PromotionsMapService } from './promotions-map.service';

@Module({
  controllers: [PromotionsController],
  providers: [PromotionsMapService, PrismaService],
})
export class PromotionsMapModule {}
