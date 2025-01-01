FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/temperature-blanket/browser /usr/share/nginx/html
ENTRYPOINT ["nginx", "-g", "daemon off;"]
