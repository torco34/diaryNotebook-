import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateSpecialDateDto } from './dto/create-special-date.dto';
import { UpdateSpecialDateDto } from './dto/update-special-date.dto';

@Injectable()
export class SpecialDatesService {
  constructor(private readonly prismaService: PrismaService) {}

  // Crear una nueva fecha especial con validación
  async create(createSpecialDateDto: CreateSpecialDateDto) {
    // Verificar si ya existe una fecha especial con el mismo título y fecha
    const existingSpecialDate = await this.prismaService.specialDate.findFirst({
      where: {
        title: createSpecialDateDto.title,
        date: createSpecialDateDto.date,
      },
    });

    if (existingSpecialDate) {
      throw new ConflictException(
        `La fecha especial con el título "${createSpecialDateDto.title}" y la fecha "${createSpecialDateDto.date}" ya existe.`,
      );
    }

    // Crear la fecha especial si no existe
    return this.prismaService.specialDate.create({
      data: createSpecialDateDto,
    });
  }

  // Obtener todas las fechas especiales
  async findAll() {
    return this.prismaService.specialDate.findMany();
  }

  // Obtener una fecha especial por ID
  async findOne(id: string) {
    const specialDate = await this.prismaService.specialDate.findUnique({
      where: { id },
    });
    if (!specialDate) {
      throw new NotFoundException(
        `No se encontró la fecha especial con el ID "${id}".`,
      );
    }
    return specialDate;
  }

  // Actualizar una fecha especial
  async update(id: string, updateSpecialDateDto: UpdateSpecialDateDto) {
    const specialDate = await this.prismaService.specialDate.findUnique({
      where: { id },
    });
    if (!specialDate) {
      throw new NotFoundException(
        `No se encontró la fecha especial con el ID "${id}".`,
      );
    }
    return this.prismaService.specialDate.update({
      where: { id },
      data: updateSpecialDateDto,
    });
  }

  // Eliminar una fecha especial
  async remove(id: string) {
    const specialDate = await this.prismaService.specialDate.findUnique({
      where: { id },
    });
    if (!specialDate) {
      throw new NotFoundException(
        `No se encontró la fecha especial con el ID "${id}".`,
      );
    }
    return this.prismaService.specialDate.delete({ where: { id } });
  }
}
