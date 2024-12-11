import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UserModule {}
