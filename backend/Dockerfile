# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --production

# Copy app source
COPY . .

# Expose port
EXPOSE 5000

# Start server
CMD ["node", "server.js"]