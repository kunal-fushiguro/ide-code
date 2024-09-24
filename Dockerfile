FROM node

WORKDIR /app

COPY ./boilerplate-code ./
RUN npm install

EXPOSE 4000

