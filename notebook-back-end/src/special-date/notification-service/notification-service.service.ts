import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private readonly prismaService: PrismaService) {}

  @Cron('0 8 * * *') // Cron job que corre todos los días a las 8:00 AM
  async notifySpecialDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const specialDates = await this.prismaService.specialDate.findMany({
      where: {
        date: tomorrow,
        notify: true,
      },
    });

    specialDates.forEach((specialDate) => {
      this.logger.log(
        `Notificación: Recuerda la fecha especial: ${specialDate.title}`,
      );
      // Aquí puedes agregar lógica para enviar correos, mensajes, etc.
    });
  }
}
