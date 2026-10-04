# --- Stage 1: Test ---
# Run tests in an isolated environment to ensure code quality before building
FROM node:20-alpine AS tester
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Run tests. If they fail, the Docker build fails.
RUN npm test

# --- Stage 2: Build ---
# Build the production Vite bundle
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- Stage 3: Production ---
# Serve the static files using a lightweight Nginx server
FROM nginx:alpine AS production
# Copy the built assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]