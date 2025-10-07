# Use official Node 18 LTS image (includes npm)
FROM node:18-alpine AS base

WORKDIR /app

# Install dependencies for the server only (use cache)
COPY server/package.json server/package-lock.json* ./server/
RUN cd server && npm install --production

# Copy the rest of the repo
COPY . .

# Expose port and set environment defaults
ENV NODE_ENV=production
ENV PORT=5050
EXPOSE 5050

# Start the server (change to "npm run start" if you prefer)
CMD ["sh", "-c", "cd server && node server.js"]
