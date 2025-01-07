import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaService } from 'src/prisma/prisma.service';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key', // Aquí puedes usar una variable de entorno
      signOptions: { expiresIn: '60d' }, // Configura el tiempo de expiración del JWT
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UserModule {}
