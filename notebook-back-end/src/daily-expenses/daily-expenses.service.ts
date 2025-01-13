import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DailyExpensesService {
  constructor(private readonly prismaService: PrismaService) {}

  // Crear un nuevo DailyExpense
  async createDailyExpense(data: any) {
    // Verificar si ya existe un gasto con el mismo nombre y fecha
    const existingExpense = await this.prismaService.dailyExpense.findFirst({
      where: {
        name: data.name,
        date: data.date,
      },
    });

    if (existingExpense) {
      // Si existe, lanza una excepción
      throw new ConflictException(
        `El gasto con el nombre "${data.name}" y la fecha "${data.date}" ya existe.`,
      );
    }

    // Si no existe, crear el registro
    return this.prismaService.dailyExpense.create({
      data: {
        name: data.name,
        price: data.price,
        date: data.date,
        dayOfWeek: data.dayOfWeek,
      },
    });
  }

  // Obtener todos los DailyExpenses
  async getAllDailyExpenses() {
    return this.prismaService.dailyExpense.findMany();
  }

  // Obtener un DailyExpense por su ID
  async getDailyExpenseById(id: string) {
    const expense = await this.prismaService.dailyExpense.findUnique({
      where: { id },
    });

    if (!expense) {
      throw new NotFoundException(`No se encontró un gasto con el ID "${id}".`);
    }

    return expense;
  }

  // Actualizar un DailyExpense
  async updateDailyExpense(id: string, data: any) {
    const existingExpense = await this.prismaService.dailyExpense.findUnique({
      where: { id },
    });

    if (!existingExpense) {
      throw new NotFoundException(`No se encontró un gasto con el ID "${id}".`);
    }

    return this.prismaService.dailyExpense.update({
      where: { id },
      data,
    });
  }

  // Eliminar un DailyExpense
  async deleteDailyExpense(id: string) {
    const existingExpense = await this.prismaService.dailyExpense.findUnique({
      where: { id },
    });

    if (!existingExpense) {
      throw new NotFoundException(`No se encontró un gasto con el ID "${id}".`);
    }

    return this.prismaService.dailyExpense.delete({
      where: { id },
    });
  }
}
