# syntax=docker/dockerfile:1
FROM node:18 as build

WORKDIR /app

COPY . .

RUN npm ci --also-dev
RUN npm -g install eslint
RUN npm install -g --save-dev jest 
RUN npm run-script build

FROM nginx:1.21.6

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD /usr/sbin/nginx -g "daemon off;"

FROM node:18