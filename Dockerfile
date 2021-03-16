FROM node:14.14.0-alpine
ADD ./ /gaggle
WORKDIR /gaggle

RUN npm install

