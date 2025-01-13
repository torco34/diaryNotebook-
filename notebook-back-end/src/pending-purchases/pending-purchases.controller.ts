import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';

import { CreatePendingPurchaseDto } from './dto/create-pending-purchase.dto';
import { UpdatePendingPurchaseDto } from './dto/update-pending-purchase.dto';
import { PendingPurchasesService } from './pending-purchases.service';

@Controller('purchases')
export class PendingPurchasesController {
  constructor(
    private readonly pendingPurchasesService: PendingPurchasesService,
  ) {}

  // Crear una nueva compra pendiente
  @Post()
  async create(
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    createPendingPurchaseDto: CreatePendingPurchaseDto,
  ) {
    return this.pendingPurchasesService.create(createPendingPurchaseDto);
  }

  // Obtener todas las compras pendientes
  @Get()
  async findAll() {
    return this.pendingPurchasesService.findAll();
  }

  // Obtener una compra pendiente por ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.pendingPurchasesService.findOne(id);
  }

  // Actualizar una compra pendiente
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    updatePendingPurchaseDto: UpdatePendingPurchaseDto,
  ) {
    return this.pendingPurchasesService.update(id, updatePendingPurchaseDto);
  }

  // Eliminar una compra pendiente
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.pendingPurchasesService.remove(id);
  }
}
