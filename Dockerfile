FROM node:14-alpine as build

WORKDIR /app

COPY . .

RUN npm ci --also-dev
RUN run build

FROM nginx:1.20.1-alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ['nginx', '-g', "daemon off;"]