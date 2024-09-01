# Nginx
FROM nginx:1.23.3

ENV NGINX_SERVER_NAME='nginx'
ENV NGINX_PORT='80'

COPY default.conf.template /etc/nginx/templates/default.conf.template
COPY ./dist /usr/share/nginx/html