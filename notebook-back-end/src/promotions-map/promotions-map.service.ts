// import { Injectable } from '@nestjs/common';
import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreatePromotionsMapDto } from './dto/create-promotions-map.dto';
import { UpdatePromotionsMapDto } from './dto/update-promotions-map.dto';

@Injectable()
export class PromotionsMapService {
  constructor(private readonly prismaService: PrismaService) {}

  // Crear una nueva promoción
  async create(createPromotionDto: CreatePromotionsMapDto) {
    return this.prismaService.promotion.create({
      data: createPromotionDto,
    });
  }

  // Obtener todas las promociones (con filtrado por categoría)
  async findAll(category?: string) {
    const where = category ? { category } : {};
    return this.prismaService.promotion.findMany({
      where,
    });
  }

  // Obtener una promoción por ID
  async findOne(id: string) {
    const promotion = await this.prismaService.promotion.findUnique({
      where: { id },
    });
    if (!promotion) {
      throw new NotFoundException(
        `No se encontró la promoción con el ID "${id}".`,
      );
    }
    return promotion;
  }

  // Actualizar una promoción
  async update(id: string, updatePromotionDto: UpdatePromotionsMapDto) {
    const promotion = await this.prismaService.promotion.findUnique({
      where: { id },
    });
    if (!promotion) {
      throw new NotFoundException(
        `No se encontró la promoción con el ID "${id}".`,
      );
    }
    return this.prismaService.promotion.update({
      where: { id },
      data: updatePromotionDto,
    });
  }

  // Eliminar una promoción
  async remove(id: string) {
    const promotion = await this.prismaService.promotion.findUnique({
      where: { id },
    });
    if (!promotion) {
      throw new NotFoundException(
        `No se encontró la promoción con el ID "${id}".`,
      );
    }
    return this.prismaService.promotion.delete({
      where: { id },
    });
  }
}
