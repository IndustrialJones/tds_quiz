FROM nginx:latest
WORKDIR /usr/share/nginx/html
COPY ./ .
COPY ./prod_nginx.conf /etc/nginx/nginx.conf