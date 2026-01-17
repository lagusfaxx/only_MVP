FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
RUN npm ci
COPY apps/api ./apps/api
COPY prisma ./prisma
WORKDIR /app/apps/api
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN apk add --no-cache dumb-init
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
RUN npm ci --only=production
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY prisma ./prisma
RUN mkdir -p uploads
USER node
EXPOSE 3001
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/server.js"]
