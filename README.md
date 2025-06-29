# Sistema de Gestión de Almacenes e Inventarios (S.G.A.I.)

Este proyecto es un sistema completo de gestión de almacenes e inventarios desarrollado con tecnología MERN (MongoDB, Express.js, React.js, Node.js) y containerizado con Docker.

## 🚀 Características Principales

- ✅ Gestión de tiendas y almacenes
- ✅ Control de inventario en tiempo real
- ✅ Administración de clientes y proveedores
- ✅ Registro de compras y ventas
- ✅ Validación de stock automática
- ✅ Interfaz moderna con Material-UI
- ✅ API REST con Express.js
- ✅ Base de datos MongoDB
- ✅ Containerización con Docker

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React.js** - Biblioteca de interfaz de usuario
- **Material-UI** - Componentes de interfaz moderna
- **Axios** - Cliente HTTP para API calls
- **React Router** - Navegación entre páginas

### Backend
- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** - Framework web para Node.js
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB

### DevOps
- **Docker** - Containerización de aplicaciones
- **Docker Compose** - Orquestación de contenedores
- **Nginx** - Servidor web y proxy reverso

## 📋 Prerequisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- [Docker](https://www.docker.com/get-started) (versión 20.0 o superior)
- [Docker Compose](https://docs.docker.com/compose/install/) (versión 2.0 o superior)

## 🚀 Instalación y Ejecución

### Opción 1: Usando Docker Compose (Recomendado)

1. **Clona el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd inventory-app
   ```

2. **Ejecuta el proyecto completo:**
   ```bash
   docker-compose up --build
   ```

3. **Accede a la aplicación:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000](http://localhost:5000)
   - MongoDB: `localhost:27017`

4. **Para detener los servicios:**
   ```bash
   docker-compose down
   ```

### Opción 2: Ejecución en modo desarrollo

Si prefieres ejecutar solo el frontend en modo desarrollo:

```bash
cd client
npm start
```

**Nota:** Esta opción requiere que el backend y MongoDB estén ejecutándose previamente.

## 📂 Estructura del Proyecto

```
inventory-app/
├── client/                 # Aplicación React (Frontend)
│   ├── public/            # Archivos públicos
│   ├── src/               # Código fuente React
│   │   ├── components/    # Componentes React
│   │   │   ├── customers/ # Gestión de clientes
│   │   │   ├── dashboard/ # Panel principal
│   │   │   ├── products/  # Gestión de productos
│   │   │   ├── purchases/ # Gestión de compras
│   │   │   ├── sales/     # Gestión de ventas
│   │   │   ├── stores/    # Gestión de tiendas
│   │   │   └── suppliers/ # Gestión de proveedores
│   │   └── App.js         # Componente principal
│   ├── Dockerfile         # Configuración Docker frontend
│   └── nginx.conf         # Configuración Nginx
├── server/                # API Express.js (Backend)
│   ├── models/           # Modelos de datos MongoDB
│   ├── routes/           # Rutas de la API
│   ├── index.js          # Servidor principal
│   └── Dockerfile        # Configuración Docker backend
└── docker-compose.yml    # Orquestación de contenedores
```

## 🌐 Endpoints de la API

### Tiendas
- `GET /api/stores/` - Listar todas las tiendas
- `POST /api/stores/add` - Crear nueva tienda

### Clientes
- `GET /api/customers/` - Listar todos los clientes
- `POST /api/customers/add` - Crear nuevo cliente

### Proveedores
- `GET /api/suppliers/` - Listar todos los proveedores
- `POST /api/suppliers/add` - Crear nuevo proveedor

### Productos
- `GET /api/products/` - Listar todos los productos
- `POST /api/products/add` - Crear nuevo producto

### Compras
- `GET /api/purchases/` - Listar todas las compras
- `POST /api/purchases/add` - Registrar nueva compra

### Ventas
- `GET /api/sales/` - Listar todas las ventas
- `POST /api/sales/add` - Registrar nueva venta

## 🔧 Comandos Útiles

### Docker Compose

```bash
# Construir y ejecutar todos los servicios
docker-compose up --build

# Ejecutar en segundo plano
docker-compose up -d

# Ver logs de todos los servicios
docker-compose logs

# Ver logs de un servicio específico
docker-compose logs frontend
docker-compose logs backend
docker-compose logs mongodb

# Detener todos los servicios
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v

# Reconstruir un servicio específico
docker-compose build frontend
docker-compose build backend
```

### Desarrollo Frontend

```bash
cd client

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start

# Construir para producción
npm run build

# Ejecutar tests
npm test
```

## 🐛 Solución de Problemas

### Error de puertos ocupados
Si el puerto 3000 o 5000 están ocupados:
```bash
# Verificar procesos usando los puertos
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# Cambiar puertos en docker-compose.yml si es necesario
```

### Problemas con MongoDB
```bash
# Verificar el estado del contenedor
docker-compose ps

# Reiniciar solo MongoDB
docker-compose restart mongodb

# Ver logs de MongoDB
docker-compose logs mongodb
```

### Limpiar Docker
```bash
# Limpiar contenedores detenidos
docker container prune

# Limpiar imágenes no utilizadas
docker image prune

# Limpiar todo (cuidado!)
docker system prune -a
```

## 📝 Funcionalidades

### Panel de Control (Dashboard)
- Vista general del inventario por tienda
- Lista de clientes y proveedores
- Métricas principales del sistema

### Gestión de Inventario
- **Tiendas**: Crear y administrar múltiples ubicaciones
- **Productos**: Se crean automáticamente al registrar compras
- **Stock**: Control automático al realizar ventas y compras

### Transacciones
- **Compras**: Registro de compras a proveedores con actualización automática de inventario
- **Ventas**: Registro de ventas con validación de stock disponible

### Validaciones
- ✅ No se pueden realizar ventas sin stock suficiente
- ✅ Los productos solo se crean mediante compras
- ✅ Validación de campos requeridos en todos los formularios

## 🤝 Contribución

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Autores

- **Equipo de Desarrollo** - *Desarrollo inicial* - Los Dolphins

## 🙏 Reconocimientos

- React Team por la excelente documentación
- Material-UI por los componentes de interfaz
- MongoDB por la base de datos flexible
- Docker por la containerización
