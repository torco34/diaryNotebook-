// import { ConflictException, Injectable } from '@nestjs/common';
// import { hash } from 'bcrypt';

// import { PrismaService } from 'src/prisma/prisma.service';
// import { CreateUserDto } from './dto/create-user.dto';

// @Injectable()
// export class UsersService {
//   constructor(private readonly prisma: PrismaService) {}

//   async register(createUserDto: CreateUserDto) {
//     const { email, password, name } = createUserDto;

//     // Verificar si el usuario ya existe
//     const existingUser = await this.prisma.user.findUnique({
//       where: { email },
//     });

//     if (existingUser) {
//       throw new ConflictException('El correo electrónico ya está registrado');
//     }

//     // Hashear la contraseña
//     const hashedPassword = await hash(password, 10);

//     // Crear el usuario
//     const user = await this.prisma.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//       },
//     });
//     console.log('Usuario creado:', user);
//     return user;
//   }
//   async findAll() {
//     return this.prisma.user.findMany(); // Obtiene todos los usuarios
//   }

//   async findOne(id: string) {
//     const user = await this.prisma.user.findUnique({
//       where: { id },
//     });
//     if (!user) {
//       throw new Error('Usuario no encontrado');
//     }
//     return user;
//   }
// }
import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // Crear un nuevo usuario
  async create(createUserDto: CreateUserDto) {
    const { email, password, name } = createUserDto;

    // Verificar si el usuario ya existe
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    // Hashear la contraseña
    const hashedPassword = await hash(password, 10);

    // Crear el usuario
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return user;
  }

  // Obtener todos los usuarios
  async findAll() {
    return this.prisma.user.findMany();
  }

  // Obtener un usuario por ID
  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  }

  // Actualizar un usuario
  async update(id: string, updateUserDto: CreateUserDto) {
    const { email, password, name } = updateUserDto;

    // Buscar el usuario existente
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Hashear la nueva contraseña si se proporcionó
    const hashedPassword = password ? await hash(password, 10) : user.password;

    // Actualizar el usuario
    return this.prisma.user.update({
      where: { id },
      data: {
        name: name || user.name,
        email: email || user.email,
        password: hashedPassword,
      },
    });
  }

  // Eliminar un usuario
  async remove(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
