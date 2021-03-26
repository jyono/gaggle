# Pull the base node image. This is linux/alpine.
# Already has node installed and setup
FROM node:14.14.0-alpine
# This command copies our machine's files and puts them into the image
ADD ./ /gaggle
# Navigate into gaggle project
WORKDIR /gaggle
# Install our node modules/libraries
RUN npm install
