FROM nginx:stable-alpine

COPY dist /usr/share/nginx/html
COPY nginx.vh.default.conf /etc/nginx/conf.d/default.conf
