# This file is a template, and might need editing before it works on your project.
FROM node:16-alpine as builder

WORKDIR /app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY package.json ./package.json
RUN npm install

COPY . .
RUN npm run build

# --- run ---
FROM nginx:stable-alpine

COPY --from=builder /app/dist/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf