# 🚀 Despliegue en Render

## Paso 1: Crear cuenta en MongoDB Atlas (Base de datos en la nube)

1. Ve a https://www.mongodb.com/cloud/atlas/register
2. Crea una cuenta gratis
3. Crea un nuevo cluster (Free Tier - M0)
4. En "Database Access" → Add New Database User
   - Username: `invitationUser`
   - Password: (genera una contraseña segura y guárdala)
5. En "Network Access" → Add IP Address
   - Permite acceso desde cualquier lugar: `0.0.0.0/0`
6. En "Database" → Connect → "Connect your application"
   - Copia la connection string, se verá así:
   ```
   mongodb+srv://invitationUser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - Reemplaza `<password>` con tu contraseña real

## Paso 2: Crear cuenta en Render

1. Ve a https://render.com/
2. Regístrate con tu cuenta de GitHub
3. Autoriza a Render para acceder a tus repositorios

## Paso 3: Subir el código a GitHub

```bash
cd backend
git init
git add .
git commit -m "Backend ready for Render deployment"
git branch -M main
git remote add origin https://github.com/Alejandro-U2/invitation-backend.git
git push -u origin main
```

## Paso 4: Desplegar en Render

1. En Render Dashboard → "New +" → "Web Service"
2. Conecta tu repositorio `invitation-backend`
3. Configura:
   - **Name**: `invitation-backend`
   - **Region**: Oregon (US West)
   - **Branch**: `main`
   - **Root Directory**: (déjalo vacío)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

4. En "Environment Variables" agrega:
   - `MONGODB_URI`: (pega tu connection string de MongoDB Atlas)
   - `NODE_ENV`: `production`

5. Click en "Create Web Service"

## Paso 5: Obtener la URL del backend

Una vez desplegado, Render te dará una URL como:
```
https://invitation-backend-xxxx.onrender.com
```

## Paso 6: Actualizar el frontend

1. Edita `.env` en la raíz del proyecto principal:
   ```
   VITE_API_URL=https://invitation-backend-xxxx.onrender.com
   ```

2. Reconstruye y despliega:
   ```bash
   npm run build
   git add .
   git commit -m "Update API URL to Render backend"
   git push
   ```

## ⚠️ Nota sobre el plan gratuito de Render

- El servicio gratuito se "duerme" después de 15 minutos de inactividad
- La primera petición después de dormir tarda ~30 segundos en responder
- Después funciona normal

## 🧪 Probar el backend

Visita: `https://tu-url-de-render.onrender.com/` 
Deberías ver: `{"message": "API de invitación funcionando correctamente"}`
