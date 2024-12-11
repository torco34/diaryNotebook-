import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service'; // Asegúrate de que la ruta sea correcta
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(private prismaService: PrismaService) {}

  // Crear un nuevo elemento en el inventario
  async create(createItemDto: CreateItemDto) {
    const formattedDate = createItemDto.date
      ? new Date(createItemDto.date)
      : new Date(); // Si no hay fecha, se usa la fecha actual.

    return this.prismaService.item.create({
      data: {
        name: createItemDto.name,
        price: createItemDto.price,
        day: createItemDto.day,
        date: formattedDate,
      },
    });
  }

  // Obtener todos los elementos del inventario
  async findAll() {
    return this.prismaService.item.findMany();
  }

  // Obtener un elemento por ID
  async findOne(id: string) {
    return await this.prismaService.item.findUnique({
      where: { id },
    });
  }

  // Eliminar un elemento por ID
  async remove(id: string) {
    return this.prismaService.item.delete({
      where: { id },
    });
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    // Verificar si el ID tiene 24 caracteres
    if (id.length !== 24) {
      throw new Error('Invalid ID format');
    }

    // Verificar y transformar el campo date a un objeto Date si existe
    const dataToUpdate = {
      ...updateItemDto,
      date: updateItemDto.date ? new Date(updateItemDto.date) : undefined,
    };

    const updatedItem = await this.prismaService.item.update({
      where: { id },
      data: dataToUpdate,
    });

    return updatedItem;
  }
}
