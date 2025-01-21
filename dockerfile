FROM node:18-alpine

WORKDIR /usr/src/app

RUN corepack enable

COPY . .

RUN yarn install

RUN yarn build

EXPOSE 3000

CMD ["sh", "-c", "yarn migration:run && yarn start:prod"]
