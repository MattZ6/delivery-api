FROM node:16

WORKDIR /usr/app

COPY package.json ./

RUN yarn

COPY . .

EXPOSE ${API_PORT}

CMD ["yarn", "dev"]
