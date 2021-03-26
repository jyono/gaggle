FROM node:14.14.0-alpine
WORKDIR "/app"
COPY ./package.json ./
RUN npm install
COPY . .

RUN npm run nx build:api

CMD ["node", "./dist/api/main.js"]
