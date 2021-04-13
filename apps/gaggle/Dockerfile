#FROM node:14.14.0-alpine as builder
#WORKDIR '/app'
#COPY ./package.json ./
#RUN npm install
#COPY . .
#RUN npm run nx run gaggle:build
#
#FROM nginx:1.19.2
#EXPOSE 4001
#COPY ./apps/gaggle/nginx/default.conf /etc/nginx/conf.d/default.conf
#COPY --from=builder /app/dist/apps/gaggle /usr/share/nginx/html
#

FROM my-base-image:nx-base AS builder

ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /app/builder
COPY . .
RUN npm run nx build gaggle ${BUILD_FLAG}

FROM nginx

WORKDIR /usr/share/nginx/html
EXPOSE 3000
COPY --from=builder /app/builder/dist/apps/gaggle ./
COPY --from=builder /app/builder/apps/gaggle/nginx.conf /etc/nginx/nginx.conf
