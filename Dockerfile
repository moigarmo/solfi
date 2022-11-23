FROM node:18.10.0-slim as dependencies

WORKDIR /dependencies
COPY ./package.json /dependencies
RUN npm install

FROM dependencies as builder

WORKDIR /builder
COPY --from=dependencies /dependencies/ /builder/
COPY . /builder/

RUN npm install -g @angular/cli
RUN npm run build:prod

FROM nginx

COPY --from=builder /builder/dist/* /usr/share/nginx/html/
#COPY nginx.conf /etc/nginx
