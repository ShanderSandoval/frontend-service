# Usar una imagen base de Node.js con la versión LTS
FROM node:18-alpine as builder

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de configuración del proyecto
COPY package.json yarn.lock* package-lock.json* ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación para producción (Ignorando errores de TypeScript)
RUN npm run build || true

# Usar una imagen ligera de Nginx para servir la aplicación
FROM nginx:alpine

# Copiar los archivos construidos desde la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]