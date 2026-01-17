FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY apps/web/package*.json ./apps/web/
RUN npm ci
COPY apps/web ./apps/web
WORKDIR /app/apps/web
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
COPY apps/web/package*.json ./apps/web/
RUN npm ci --only=production
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/public ./apps/web/public
USER node
EXPOSE 3000
CMD ["npm", "start", "--prefix", "apps/web"]
