# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx (Sangat Ringan)
FROM nginx:alpine
# Copy hasil build (folder 'out') ke folder Nginx
COPY --from=builder /app/out /usr/share/nginx/html
# Copy config default Nginx (agar support routing SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
