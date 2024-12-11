import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update.product.dto';

// import { UpdateProductDto } from './dto/update-product.dto';
@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}
  // crea un producto
  async create(createProductDto: CreateProductDto): Promise<Product> {
    console.log('Iniciando la creación del producto', createProductDto);
    // Verificar si el producto ya existe por nombre (u otro campo único)
    const existingProduct = await this.prismaService.product.findFirst({
      where: { name: createProductDto.name }, // Verifica si el producto con el mismo nombre existe
    });

    if (existingProduct) {
      // Si ya existe, lanza una excepción de conflicto (409)
      throw new ConflictException(
        `El producto con el nombre ${createProductDto.name} ya existe`,
      );
    }
    try {
      const product = await this.prismaService.product.create({
        data: createProductDto as Prisma.ProductCreateInput,
      });
      console.log('Producto creado:', product);
      return product;
    } catch (error) {
      console.error('Error al crear el producto:', error);
      throw error; // Lanza el error para que sea capturado por NestJS
    }
  }
  async findAll(): Promise<Product[]> {
    return this.prismaService.product.findMany();
  }
  // trae el producto por id
  async findOne(id: string) {
    try {
      const productId = await this.prismaService.product.findUnique({
        where: {
          id: id,
        },
      });
      console.log(productId);
      if (!productId) {
        throw new NotFoundException(`Producto con id ${id} no encontrado`);
      }
      return productId;
    } catch (error) {
      console.error('Error al crear el producto:', error);
      throw error;
    }
  }
  // eliminar el producto
  async remove(id: string) {
    try {
      const productDelete = await this.prismaService.product.delete({
        where: { id },
      });
      if (!productDelete) {
        throw new NotFoundException(`Producto con id ${id} no encontrado`);
      }
      return productDelete;
    } catch (error) {
      console.error('Error al crear el producto:', error);
      throw error;
    }
  }
  // actualizar el producto

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const productUpdate = await this.prismaService.product.update({
        where: { id },
        data: updateProductDto,
      });
      if (!productUpdate) {
        throw new NotFoundException(`Producto con id ${id} no encontrado`);
      }
      return productUpdate;
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      throw error;
    }
  }
}
