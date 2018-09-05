FROM node:10

USER node

RUN mkdir -p /home/node/firethorn
WORKDIR /home/node/firethorn

COPY src/package.json /home/node/firethorn
RUN npm install

COPY src /home/node/firethorn

RUN npm run build
EXPOSE 3000

CMD ["npm", "start"]
