FROM node:22.13.0-bookworm-slim AS dependencies
WORKDIR /app
ENV DATABASE_URL=postgresql://build:build@localhost:5432/build
COPY package.json package-lock.json ./
COPY prisma.config.ts ./
COPY prisma ./prisma
RUN npm ci

FROM dependencies AS migrator
COPY . .
CMD ["sh", "-c", "npx prisma migrate deploy && npm run db:seed"]

FROM dependencies AS builder
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22.13.0-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
RUN groupadd --system nodejs && usermod --append --groups nodejs node
COPY --from=builder --chown=node:nodejs /app/public ./public
COPY --from=builder --chown=node:nodejs /app/.next/standalone ./
COPY --from=builder --chown=node:nodejs /app/.next/static ./.next/static
RUN mkdir -p /data/uploads /data/mail && chown -R node:nodejs /data /app
USER node
EXPOSE 3000
CMD ["node", "server.js"]
