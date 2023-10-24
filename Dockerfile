FROM node:18 as prod

WORKDIR /app
RUN npm install yarn
COPY package*.json .
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 4400
CMD ["yarn", "prod"]