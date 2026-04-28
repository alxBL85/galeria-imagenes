# Galería de Imágenes API

API REST para gestionar una galería de imágenes con usuarios, colecciones e imágenes. Desarrollada con **TypeScript**, **Express**, **Prisma** y **SQLite**.

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Arquitectura](#arquitectura)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Scripts Disponibles](#scripts-disponibles)
- [Configuración](#configuración)
- [Base de Datos](#base-de-datos)
- [API Endpoints](#api-endpoints)
- [Ejemplos de Uso](#ejemplos-de-uso)
- [Autor](#autor)

## 📝 Descripción

Una API REST completa para gestionar una galería de imágenes con las siguientes funcionalidades:

- **Gestión de Usuarios**: Registro de nuevos usuarios
- **Colecciones**: Creación de colecciones de imágenes y listado por usuario
- **Imágenes**: Subida de imágenes a colecciones y listado por colección

Este proyecto es un tutorial práctico para aprender **Clean Architecture** con **Express** y **TypeScript**.

## 🏗️ Arquitectura

El proyecto implementa **Clean Architecture** (Arquitectura Limpia), separando las responsabilidades en capas claramente definidas:

```
┌─────────────────────────────────────────────────────┐
│              INTERFACES (HTTP)                      │
│  Controllers │ Routes │ HTTP Server                 │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│           APPLICATION (Use Cases)                   │
│  Lógica de negocio, casos de uso                    │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│              DOMAIN (Entidades)                     │
│  Entidades, Interfaces de repositorios              │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│          INFRASTRUCTURE (Implementación)            │
│  Prisma, Base de datos, Repositorios concretos      │
└─────────────────────────────────────────────────────┘
```

### Principios de Diseño

- **Independencia de Frameworks**: La lógica de negocio no depende de Express
- **Independencia de Base de Datos**: Fácil cambiar la implementación de datos
- **Testeable**: Las capas están desacopladas y pueden ser testeadas independientemente
- **Mantenible**: Código organizado y responsabilidades claras

## 📁 Estructura del Proyecto

```
galeria-imagenes/
├── src/
│   ├── main.ts                                    # Entrada principal de la aplicación
│   ├── config/
│   │   └── env.ts                                # Variables de entorno
│   ├── domain/                                    # Capa de dominio
│   │   ├── entities/                             # Entidades del negocio
│   │   │   ├── User.ts
│   │   │   ├── Collection.ts
│   │   │   └── Image.ts
│   │   └── repositories/                         # Interfaces de repositorios
│   │       ├── UserRepository.ts
│   │       ├── CollectionRepository.ts
│   │       └── ImageRepository.ts
│   ├── application/                              # Capa de aplicación
│   │   └── use-cases/                            # Casos de uso
│   │       ├── user/
│   │       │   └── CreateUser.ts
│   │       ├── collection/
│   │       │   ├── CreateCollection.ts
│   │       │   └── GetUserCollections.ts
│   │       └── image/
│   │           ├── UploadImage.ts
│   │           └── GetCollectionImages.ts
│   ├── infrastructure/                           # Capa de infraestructura
│   │   └── database/
│   │       ├── prisma/
│   │       │   ├── schema.prisma                # Esquema de la BD
│   │       │   ├── client.ts                    # Cliente Prisma
│   │       │   └── migrations/                  # Migraciones de BD
│   │       └── repositories/
│   │           ├── PrismaUserRepository.ts
│   │           ├── PrismaCollectionRepository.ts
│   │           └── PrismaImageRepository.ts
│   └── interfaces/                               # Capa de interfaz HTTP
│       ├── controllers/                          # Controladores Express
│       │   ├── UserController.ts
│       │   ├── CollectionController.ts
│       │   └── ImageController.ts
│       ├── routes/                               # Definición de rutas
│       │   ├── userRoutes.ts
│       │   ├── collectionRoutes.ts
│       │   └── ImageRoutes.ts
│       └── http/
│           └── server.ts                         # Configuración del servidor
├── package.json                                   # Dependencias del proyecto
├── tsconfig.json                                  # Configuración de TypeScript
├── prisma.config.ts                              # Configuración de Prisma
└── README.md                                      # Este archivo
```

## ✅ Requisitos Previos

- **Node.js** >= 16.x
- **npm** >= 8.x (o yarn/pnpm)

## 🚀 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd galeria-imagenes
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno** (crear archivo `.env`)
   ```bash
   DATABASE_URL="file:./dev.db"
   NODE_ENV="development"
   ```

4. **Ejecutar migraciones de base de datos**
   ```bash
   npm run prisma-initial-migration
   ```

5. **Generar cliente Prisma** (si no se generó automáticamente)
   ```bash
   npm run prisma-generate-client
   ```

## 📜 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor en modo desarrollo con recompilación automática (ts-node) |
| `npm start` | Inicia la aplicación compilada en producción |
| `npm run build` | Compila TypeScript a JavaScript y aplica alias de ruta |
| `npm run prisma-initial-migration` | Crea la migración inicial de base de datos |
| `npm run prisma-generate-client` | Regenera el cliente de Prisma |
| `npm test` | Ejecuta los tests (no configurado aún) |

## ⚙️ Configuración

### Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
# Base de datos
DATABASE_URL="file:./dev.db"

# Entorno
NODE_ENV="development"
```

### Path Aliases (TypeScript)

El proyecto está configurado con aliases de ruta para mejorar las importaciones:

```typescript
// Alias disponibles
@domain/*         // src/domain/*
@application/*    // src/application/*
@infrastructure/* // src/infrastructure/*
@interfaces/*     // src/interfaces/*

// Ejemplo de uso
import { User } from "@domain/entities/User";
import { CreateUser } from "@application/use-cases/user/CreateUser";
```

## 🗄️ Base de Datos

### Modelos de Datos

#### User
```prisma
model User {
  id          String       @id
  email       String       @unique
  password    String
  collections Collection[]
}
```

#### Collection
```prisma
model Collection {
  id        String   @id
  name      String
  type      String
  createdAt DateTime
  userId    String
  
  user      User     @relation(fields: [userId], references: [id])
  images    Image[]
}
```

#### Image
```prisma
model Image {
  id            String   @id
  name          String
  description   String
  path          String
  createdAt     DateTime
  collectionId  String
  
  collection    Collection @relation(fields: [collectionId], references: [id])
}
```

### Migraciones

Las migraciones se encuentran en `src/infrastructure/database/prisma/migrations/`. Para crear una nueva migración:

```bash
npx prisma migrate dev --name nombre_migracion
```

## 🔌 API Endpoints

El servidor corre en `http://localhost:3000` y expone los siguientes endpoints:

### Usuarios (`/users`)

| Método | Endpoint | Descripción | Body |
|--------|----------|-------------|------|
| POST | `/users` | Registrar nuevo usuario | `{ id, email, password }` |

**Ejemplo:**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "id": "user-123",
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Colecciones (`/collections`)

| Método | Endpoint | Descripción | Body |
|--------|----------|-------------|------|
| POST | `/collections` | Crear nueva colección | `{ id, name, type, createdAt, userId }` |
| GET | `/collections/user/:userId` | Listar colecciones de un usuario | - |

**Ejemplo:**
```bash
# Crear colección
curl -X POST http://localhost:3000/collections \
  -H "Content-Type: application/json" \
  -d '{
    "id": "col-123",
    "name": "Vacaciones 2026",
    "type": "vacation",
    "createdAt": "2026-04-28T10:00:00Z",
    "userId": "user-123"
  }'

# Listar colecciones del usuario
curl -X GET http://localhost:3000/collections/user/user-123
```

### Imágenes (`/images`)

| Método | Endpoint | Descripción | Body |
|--------|----------|-------------|------|
| POST | `/images` | Subir imagen a una colección | `multipart/form-data: { image (file), name, description, collectionId }` |
| GET | `/images/collection/:collectionId` | Listar imágenes de una colección | - |

**Ejemplo:**
```bash
# Subir imagen
curl -X POST http://localhost:3000/images \
  -F "image=@/path/to/image.jpg" \
  -F "name=Foto de vacaciones" \
  -F "description=Una foto hermosa" \
  -F "collectionId=col-123"

# Listar imágenes de colección
curl -X GET http://localhost:3000/images/collection/col-123
```

## 💡 Ejemplos de Uso

### Flujo Completo

```bash
# 1. Crear un usuario
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "id": "user-001",
    "email": "alex@example.com",
    "password": "secure123"
  }'

# 2. Crear una colección
curl -X POST http://localhost:3000/collections \
  -H "Content-Type: application/json" \
  -d '{
    "id": "col-001",
    "name": "Fotos del Viaje",
    "type": "travel",
    "createdAt": "2026-04-28T10:00:00Z",
    "userId": "user-001"
  }'

# 3. Subir una imagen
curl -X POST http://localhost:3000/images \
  -F "image=@./photo.jpg" \
  -F "name=Foto 1" \
  -F "description=Primera foto del viaje" \
  -F "collectionId=col-001"

# 4. Listar imágenes
curl -X GET http://localhost:3000/images/collection/col-001

# 5. Listar colecciones del usuario
curl -X GET http://localhost:3000/collections/user/user-001
```

## 🛠️ Tecnologías Utilizadas

- **Runtime**: Node.js
- **Lenguaje**: TypeScript
- **Framework Web**: Express.js v5.2.1
- **ORM**: Prisma v7.7.0
- **Base de Datos**: SQLite
- **Herramientas**:
  - `ts-node`: Ejecución de TypeScript sin compilación
  - `multer`: Manejo de carga de archivos
  - `dotenv`: Gestión de variables de entorno
  - `tsx`: Ejecutor TypeScript alternativo

## 📦 Dependencias Principales

### Producción
```json
{
  "@prisma/adapter-better-sqlite3": "^7.7.0",
  "@prisma/client": "^7.7.0",
  "@types/express": "^5.0.6",
  "express": "^5.2.1",
  "multer": "^2.1.1"
}
```

### Desarrollo
```json
{
  "@types/better-sqlite3": "^7.6.13",
  "@types/multer": "^2.1.0",
  "@types/node": "^25.6.0",
  "dotenv": "^17.4.2",
  "prisma": "^7.7.0",
  "ts-node": "^10.9.2",
  "tsc-alias": "^1.8.16",
  "tsconfig-paths": "^4.2.0",
  "typescript": "^6.0.3"
}
```

## 📚 Conceptos de Clean Architecture Implementados

1. **Entities (Dominio)**: Contienen la lógica de negocio pura
2. **Use Cases (Aplicación)**: Orquestan las acciones del sistema
3. **Repositories (Abstracción)**: Interfaces que definen cómo acceder a los datos
4. **Controllers (Interfaz)**: Adaptan las peticiones HTTP a los use cases
5. **Dependency Injection**: Los casos de uso y controladores reciben sus dependencias

## 🧪 Pruebas

El proyecto aún no tiene suite de tests configurada. Para agregar pruebas, se recomienda:

- **Jest** o **Vitest** para unit tests
- **Supertest** para tests de integración con Express

## 📄 Licencia

ISC

## 👤 Autor

**Alexander Bolaños**

---

**Última actualización**: Abril 28, 2026
