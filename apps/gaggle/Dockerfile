FROM node:14.14.0-alpine as builder
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run nx run gaggle:build

FROM nginx
EXPOSE 4001
COPY ./apps/gaggle/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
