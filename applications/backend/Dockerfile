# Build stage
FROM node:22 AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Production stage
FROM node:22-slim AS production

WORKDIR /app

COPY --from=build /app/package*.json ./
RUN npm ci --only=production

COPY --from=build /app ./

EXPOSE 3000

CMD ["npm", "start"]

# Development stage
FROM node:22 AS development

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]