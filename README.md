# Aplicación de Cuaderno de Notas

Este proyecto es una aplicación web diseñada para ayudar a los usuarios a gestionar notas personales, gastos diarios y fechas importantes. La aplicación está construida utilizando **Next.js** para el frontend y **NestJS** para el backend.

## Características

- **Gestión de notas**: Los usuarios pueden crear, editar y eliminar notas personales.
- **Registro de gastos diarios**: Permite registrar y visualizar gastos diarios.
- **Fechas especiales**: Los usuarios pueden guardar fechas importantes como aniversarios, cumpleaños, etc.
- **Interfaz amigable**: Una experiencia de usuario moderna e intuitiva gracias a Next.js.
- **API robusta**: Backend desarrollado con NestJS que garantiza una arquitectura limpia y escalable.

---

## Tecnologías utilizadas

### Frontend
- **[Next.js](https://nextjs.org/)**: Un framework React para la creación de aplicaciones web rápidas y optimizadas para SEO.
- **CSS/Frameworks de diseño**: Para los estilos y la presentación visual de la aplicación.
- **React Hooks y Context API**: Para la gestión del estado de la aplicación en el frontend.
- **Ejecuta:** npm run dev
- **El proyecto estará disponible en** http://localhost:3000

### Backend
- **[NestJS](https://nestjs.com/)**: Un framework de Node.js basado en TypeScript que ofrece herramientas para crear aplicaciones escalables y mantenibles.
- **Base de datos**: (Indica la base de datos que utilizas, por ejemplo, PostgreSQL, MongoDB, etc.)
- **JWT para autenticación**: Seguridad mediante autenticación basada en tokens.
- **Ejecuta:** npm run start:dev
- **El backend estará disponible en** http://localhost:4000 

---

## Arquitectura de la Aplicación

1. **Frontend (Next.js)**:
   - Sirve la interfaz de usuario.
   - Consume la API REST proporcionada por el backend.
   - Gestión del estado con Context API o cualquier otra biblioteca si aplica.
   - Ejecuta: npm run dev

2. **Backend (NestJS)**:
   - Proporciona endpoints RESTful para interactuar con los datos.
   - Gestiona la lógica del negocio y la conexión con la base de datos.

  
