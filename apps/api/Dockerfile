# ---------- builder ----------
FROM node:18-bookworm-slim AS builder
WORKDIR /app

# deps
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
RUN npm install

# source
COPY apps/api ./apps/api
COPY prisma ./prisma

# prisma + build
WORKDIR /app/apps/api
RUN npx prisma generate --schema=/app/prisma/schema.prisma
RUN npm run build


# ---------- runtime ----------
FROM node:18-bookworm-slim
WORKDIR /app

# dumb-init + openssl (clave para prisma)
RUN apt-get update \
  && apt-get install -y --no-install-recommends dumb-init openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
RUN npm install --omit=dev

COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY prisma ./prisma

RUN mkdir -p uploads \
  && chown -R node:node /app

USER node
EXPOSE 3001
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/server.js"]
