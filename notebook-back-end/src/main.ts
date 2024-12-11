import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('Products')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('items/:id', app, document);

  // Configuraciones globales de la aplicación
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Habilita la transformación de datos según los DTOs
      whitelist: true, // Filtra propiedades no deseadas en los DTOs
      forbidNonWhitelisted: true, // Lanza un error si se envían propiedades no deseadas
    }),
  );

  // Inicia la aplicación
  await app.listen(4000);
}
bootstrap();
