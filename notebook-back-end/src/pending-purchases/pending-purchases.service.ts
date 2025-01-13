import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service'; // Asegúrate de tener el PrismaService
import { CreatePendingPurchaseDto } from './dto/create-pending-purchase.dto';
import { UpdatePendingPurchaseDto } from './dto/update-pending-purchase.dto';

@Injectable()
export class PendingPurchasesService {
  constructor(private readonly prismaService: PrismaService) {}

  // Crear una nueva compra pendiente
  async create(createPendingPurchaseDto: CreatePendingPurchaseDto) {
    // Validación: Verificar si ya existe una compra pendiente con el mismo nombre (item)
    const existingPurchase = await this.prismaService.pendingPurchase.findFirst(
      {
        where: { item: createPendingPurchaseDto.item },
      },
    );

    if (existingPurchase) {
      throw new ConflictException(
        `El gasto con el nombre "${createPendingPurchaseDto.item}" y la fecha "${createPendingPurchaseDto.item}" ya existe.`,
      );
    }

    return this.prismaService.pendingPurchase.create({
      data: createPendingPurchaseDto,
    });
  }

  // Obtener todas las compras pendientes
  async findAll() {
    const pendingPurchases =
      await this.prismaService.pendingPurchase.findMany();

    if (pendingPurchases.length === 0) {
      throw new NotFoundException(`No se encontraron compras pendientes.`);
    }

    return pendingPurchases;
  }

  // Obtener una compra pendiente por ID
  async findOne(id: string) {
    const purchase = await this.prismaService.pendingPurchase.findUnique({
      where: { id },
    });

    if (!purchase) {
      throw new Error(`Compra pendiente con ID ${id} no encontrada`);
    }

    return purchase;
  }

  // Actualizar una compra pendiente
  async update(id: string, updatePendingPurchaseDto: UpdatePendingPurchaseDto) {
    const existingPurchase =
      await this.prismaService.pendingPurchase.findUnique({
        where: { id },
      });

    if (!existingPurchase) {
      throw new NotFoundException(`No se encontró un gasto con el ID "${id}".`);
    }

    return this.prismaService.pendingPurchase.update({
      where: { id },
      data: updatePendingPurchaseDto,
    });
  }

  // Eliminar una compra pendiente
  async remove(id: string) {
    const existingPurchase =
      await this.prismaService.pendingPurchase.findUnique({
        where: { id },
      });

    if (!existingPurchase) {
      throw new NotFoundException(`No se encontró un gasto con el ID "${id}".`);
    }

    return this.prismaService.pendingPurchase.delete({
      where: { id },
    });
  }
}
