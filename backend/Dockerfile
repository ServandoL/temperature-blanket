# specify the node base image with your desired version node:<version>
FROM node:22
WORKDIR /usr/share/app
COPY ./dist/ .
COPY ./node_modules ./node_modules
# replace this with your application's default port
EXPOSE 9001
ENTRYPOINT ["node", "/usr/share/app/index.js"]
