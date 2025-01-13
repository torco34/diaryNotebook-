import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service'; // Importar el servicio Prisma

@Injectable()
export class DailyExpensesService {
  constructor(private readonly prismaService: PrismaService) {}

  // Crear un nuevo DailyExpense
  async createDailyExpense(data: any) {
    return this.prismaService.dailyExpense.create({
      data: {
        name: data.name,
        price: data.price,
        date: data.date, // Asegúrate de que 'date' sea un objeto Date o una cadena válida
        dayOfWeek: data.dayOfWeek,
      },
    });
  }

  // Obtener todos los DailyExpenses
  async getAllDailyExpenses() {
    return this.prismaService.dailyExpense.findMany(); // Accede al modelo 'DailyExpense'
  }

  // Obtener un DailyExpense por su ID
  async getDailyExpenseById(id: string) {
    return this.prismaService.dailyExpense.findUnique({
      where: { id },
    });
  }

  // Actualizar un DailyExpense
  async updateDailyExpense(id: string, data: any) {
    return this.prismaService.dailyExpense.update({
      where: { id },
      data,
    });
  }

  // Eliminar un DailyExpense
  async deleteDailyExpense(id: string) {
    return this.prismaService.dailyExpense.delete({
      where: { id },
    });
  }
}
