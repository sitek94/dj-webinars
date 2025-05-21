# Development stage
FROM node:22-alpine AS development
WORKDIR /app

# Create non-root user and group
RUN addgroup -g 1001 appgroup && adduser -D -u 1001 -G appgroup appuser

COPY package*.json ./
RUN npm install
COPY . .

# Ensure user owns the app directory
RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 4200
CMD ["npm", "start", "--", "--host", "0.0.0.0"]



# Production build stage
FROM node:22-alpine AS build
WORKDIR /app

RUN addgroup -g 1001 appgroup && adduser -D -u 1001 -G appgroup appuser

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

RUN chown -R appuser:appgroup /app

USER appuser



# Production serve stage
FROM nginx:alpine AS production

# Create non-root user for NGINX
RUN addgroup -g 1001 appgroup && adduser -D -u 1001 -G appgroup appuser

# Copy build output and nginx config
COPY --from=build /app/dist/deliveroo-frontend/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Change ownership of files served by nginx
RUN chown -R appuser:appgroup /usr/share/nginx/html

USER appuser

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
