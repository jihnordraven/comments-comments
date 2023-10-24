FROM node:18 as build

WORKDIR /app
RUN npm install -g yarn
COPY package*.json .
RUN yarn install
COPY . .
RUN yarn build

FROM node:18 as prod

WORKDIR /app
RUN npm install -g yarn
COPY package.json .
RUN yarn install
COPY --from=build ./app/dist .
CMD ["yarn", "prod"]