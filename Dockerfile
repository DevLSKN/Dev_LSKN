# Etapa de construcción
FROM node:18-alpine AS builder
WORKDIR /app
# Copiar archivos de configuración primero
COPY package*.json ./
COPY next.config.js ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
# Instalar dependencias
RUN npm ci
# Copiar el resto del código fuente
COPY . .
# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM node:18-alpine AS runner
WORKDIR /app

# Copiar los archivos necesarios desde la etapa de construcción
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Configurar variables de entorno
ENV NODE_ENV=production
ENV PORT=3000

# Exponer el puerto
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "server.js"]
