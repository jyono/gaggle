FROM my-base-image:nx-base AS builder
WORKDIR "/app/builder"

ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /app/builder
COPY . .
RUN npm run nx build api ${BUILD_FLAG}

FROM my-base-image:nx-base

WORKDIR /app
COPY --from=builder /app/builder ./
ENV NODE_ENV=$NODE_ENV
CMD ["node", "./dist/apps/api/main.js"]
