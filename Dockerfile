# FROM node:22-alpine AS builder
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ARG VITE_OPENAI_API_KEY
ENV VITE_OPENAI_API_KEY=$VITE_OPENAI_API_KEY
RUN npm run build

# Etapa 2: Servidor nginx
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
