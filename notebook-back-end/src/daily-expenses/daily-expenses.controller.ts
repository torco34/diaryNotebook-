import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { DailyExpensesService } from './daily-expenses.service'; // Importar el servicio
import { CreateDailyExpenseDto } from './dto/create-daily-expense.dto'; // Asegúrate de tener un DTO para validaciones

@Controller('expenses') // Aquí agregamos el prefijo 'api' a la ruta
export class DailyExpensesController {
  constructor(private readonly dailyExpensesService: DailyExpensesService) {}

  // Crear un nuevo DailyExpense
  @Post()
  create(@Body() createDailyExpenseDto: CreateDailyExpenseDto) {
    return this.dailyExpensesService.createDailyExpense(createDailyExpenseDto);
  }

  // Obtener todos los DailyExpenses
  @Get()
  findAll() {
    return this.dailyExpensesService.getAllDailyExpenses();
  }

  // Obtener un DailyExpense por su ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dailyExpensesService.getDailyExpenseById(id);
  }

  // Actualizar un DailyExpense
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDailyExpenseDto: CreateDailyExpenseDto, // O usa otro DTO si necesitas diferenciar creación y actualización
  ) {
    return this.dailyExpensesService.updateDailyExpense(
      id,
      updateDailyExpenseDto,
    );
  }

  // Eliminar un DailyExpense
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dailyExpensesService.deleteDailyExpense(id);
  }
}
