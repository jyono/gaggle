# Build  base image
# docker build . -t my-base-image:nx-base

FROM node:14.14.0-alpine

ARG NODE_ENV
ARG BUILD_FLAG

WORKDIR /app/builder

COPY . .
RUN npm i
