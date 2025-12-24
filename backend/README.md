# 🎉 Sistema de Invitaciones con MongoDB Atlas

Sistema completo de validación de invitados para evento de XV años.

## 📋 Características

- ✅ Validación de invitados con base de datos MongoDB Atlas (en la nube)
- 👥 Muestra cantidad de personas por invitación
- 💾 Persistencia de sesión (localStorage)
- 🎵 Opción de música de fondo
- 📱 Diseño responsive

## 🚀 Configuración

### 1. Configurar MongoDB Atlas

1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) y crea una cuenta gratuita
2. Crea un nuevo cluster (el tier gratuito es suficiente)
3. En "Database Access", crea un usuario con contraseña
4. En "Network Access", agrega tu IP (o 0.0.0.0/0 para permitir todas)
5. Click en "Connect" → "Connect your application"
6. Copia la cadena de conexión

### 2. Configurar Backend

```bash
cd backend
```

Edita el archivo `.env` y agrega tu cadena de conexión:

```env
MONGODB_URI=mongodb+srv://tu_usuario:tu_contraseña@cluster0.xxxxx.mongodb.net/invitation_db?retryWrites=true&w=majority
PORT=5000
```

### 3. Agregar Invitados

Edita `backend/scripts/seedDatabase.js` y agrega tus invitados:

```javascript
const guestsData = [
  { nombre: 'Juan Pérez', numeroPersonas: 2, mesa: 'A1' },
  { nombre: 'María García', numeroPersonas: 4, mesa: 'A2' },
  // Agrega más invitados...
];
```

Ejecuta el script para cargar los invitados:

```bash
npm run seed
```

### 4. Iniciar Backend

```bash
npm run dev
```

El servidor estará en: http://localhost:5000

### 5. Iniciar Frontend

En otra terminal:

```bash
cd ..
npm run dev
```

El frontend estará en: http://localhost:5173

## 📁 Estructura del Proyecto

```
invitation/
├── backend/
│   ├── models/
│   │   └── Guest.js          # Modelo de invitado
│   ├── routes/
│   │   └── guests.js         # Rutas API
│   ├── scripts/
│   │   └── seedDatabase.js   # Script para cargar invitados
│   ├── server.js             # Servidor principal
│   ├── package.json
│   └── .env
├── src/
│   ├── components/
│   │   ├── GuestValidation.jsx     # Pantalla de login
│   │   ├── InvitationPage.jsx      # Invitación principal
│   │   ├── FloralDecoration.jsx
│   │   └── FloralCorner.jsx
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

## 🔌 API Endpoints

### Validar Invitado
```http
POST /api/guests/validate
Content-Type: application/json

{
  "nombre": "Juan Pérez"
}
```

Respuesta exitosa:
```json
{
  "success": true,
  "guest": {
    "id": "...",
    "nombre": "Juan Pérez",
    "numeroPersonas": 2,
    "confirmado": false,
    "mesa": "A1"
  }
}
```

### Confirmar Asistencia
```http
POST /api/guests/confirm
Content-Type: application/json

{
  "guestId": "...",
  "confirmado": true,
  "telefono": "12345678",
  "email": "juan@example.com"
}
```

### Obtener Todos los Invitados (Admin)
```http
GET /api/guests/all
```

### Crear Nuevo Invitado
```http
POST /api/guests/create
Content-Type: application/json

{
  "nombre": "Nuevo Invitado",
  "numeroPersonas": 3,
  "mesa": "A5"
}
```

## 🛠️ Tecnologías

**Backend:**
- Node.js
- Express
- MongoDB (Atlas)
- Mongoose
- CORS

**Frontend:**
- React 18
- Vite
- Tailwind CSS

## 📝 Notas

- La búsqueda de invitados es insensible a mayúsculas/minúsculas
- Los datos del invitado se guardan en localStorage para persistencia
- Puedes agregar más campos al modelo (email, teléfono, notas, etc.)

## 🔒 Seguridad

- No subas el archivo `.env` al repositorio
- Usa variables de entorno para datos sensibles
- Considera agregar autenticación para rutas administrativas

## 📞 Soporte

Si tienes problemas:
1. Verifica que MongoDB Atlas esté configurado correctamente
2. Asegúrate de que tu IP esté en la lista blanca
3. Revisa que la cadena de conexión sea correcta
4. Verifica que el backend esté corriendo en el puerto 5000

¡Disfruta tu evento! 🎊
