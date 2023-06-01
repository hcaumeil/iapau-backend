FROM node:18-alpine

WORKDIR /app

COPY . .

EXPOSE 8080

ENV BISCUIT_KEY="095290569481f9ecd9f59e5cf52323769c4943bc8c20c722289b775ab4d9080f"
ENV PG_DATABASE="iapau"
ENV PG_HOST="postgres"
ENV PG_PASSWORD="postgres"
ENV PG_PORT="5432"
ENV PG_USER="iapau"

RUN apk add git
RUN apk add postgresql
RUN apk add postgresql-client
RUN npm i

CMD [ "npm", "run", "docker" ]