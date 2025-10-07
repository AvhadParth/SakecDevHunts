# Use official Node 18 LTS image
FROM node:18-alpine

# Set working directory to /app/server
WORKDIR /app/server

# Copy and install dependencies
COPY server/package*.json ./
RUN npm install --production

# Copy the rest of the code
COPY server ./

# Expose port
ENV PORT=5050
EXPOSE 5050

# Start the server directly
CMD ["node", "server.js"]
