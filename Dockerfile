FROM node:14.14.0-alpine
ADD ./ /gaggle
WORKDIR /gaggle

RUN npm install

RUN ls -a

RUN npm run build
RUN cd dist
RUN ls -a
RUN cd api
RUN ls -a
