FROM nginx:1.28.1

COPY ./dist/ /usr/share/nginx/html

RUN sed -i 's/index  index.html index.htm;/&\ntry_files $uri $uri\/ \/index.html;/' /etc/nginx/conf.d/default.conf
