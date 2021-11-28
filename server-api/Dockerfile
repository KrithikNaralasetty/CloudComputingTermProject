# syntax=docker/dockerfile:1
FROM node:latest
RUN apk add --no-cache python3 g++ make
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "server.js"]
