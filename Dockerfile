# syntax=docker/dockerfile:1
FROM node:18 as build
# EXPOSE 80
WORKDIR /app

COPY . .

RUN npm ci --also-dev
RUN npm -g install eslint
RUN npm install -g --save-dev jest 
RUN npm install -g serve
RUN npm run-script build

RUN npm run serve

# FROM nginx:1.21.6
# EXPOSE 80
# COPY --from=build /app/build /usr/share/nginx/html



# CMD /usr/sbin/nginx -g "daemon off;"

# FROM node:18
# EXPOSE 80