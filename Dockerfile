FROM node:18-alpine

WORKDIR /app

# Instalar dependencias desde el lock (reproducible y más rápido que npm install)
COPY package*.json ./
RUN npm ci --omit=dev

# Copiar el resto de la aplicación
COPY . .

# Asegurar que existan los directorios que server.js escribe en runtime
RUN mkdir -p data/backups uploads

# Railway inyecta PORT en runtime; server.js lo lee con process.env.PORT
CMD ["node", "server.js"]
