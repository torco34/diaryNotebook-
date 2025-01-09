import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // Crear un nuevo usuario
  async create(createUserDto: CreateUserDto) {
    const { email, password, name, city } = createUserDto;

    // Verificar si el correo electrónico ya está registrado
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    // Hashear la contraseña antes de guardar en la base de datos
    const hashedPassword = await hash(password, 10);

    // Crear el usuario
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        city, // La ciudad viene directamente del usuario
      },
    });

    // Generar token JWT
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { user, token }; // Devolver el usuario y el token
  }

  // Método para iniciar sesión
  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    // Buscar al usuario por el nombre de usuario (en este caso es el email)
    const user = await this.prisma.user.findUnique({
      where: { email: username }, // Usamos el email para login
    });

    if (!user) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    // Verificar la contraseña usando bcrypt.compare
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    // Generar token JWT
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { user: user.name, token }; // Retornar el email y el token
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
    const { email, password, name, city } = updateUserDto;

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
        ...(city && { city }), // Actualizar la ciudad solo si se proporciona
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
