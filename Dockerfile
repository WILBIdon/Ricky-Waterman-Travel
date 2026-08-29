FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy application files
COPY . .

# Ensure data and uploads directories exist
RUN mkdir -p data uploads

# Expose Railway dynamic PORT
EXPOSE ${PORT}

# Start Express Node.js server
CMD ["node", "server.js"]
