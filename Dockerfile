FROM node:14.16-alpine as build

WORKDIR /app

RUN apk add --no-cache git

COPY package.json /app
RUN npm install sass@1.45.2 --silient
RUN npm install --production --silient
COPY . /app
RUN npm run build

# prepare nginx
FROM nginx:1.19.8-alpine
COPY --from=build /app/build /var/www
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
