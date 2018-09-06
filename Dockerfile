FROM node:10

EXPOSE 3000

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install dependencies
COPY ./src/package.json /app
RUN npm install

# Bundle app
COPY ./src /app