FROM nginx:alpine

COPY index.html /usr/share/nginx/html/
COPY test.html /usr/share/nginx/html/
COPY power-flow-card.js /usr/share/nginx/html/
COPY src/assets/ /usr/share/nginx/html/assets/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
