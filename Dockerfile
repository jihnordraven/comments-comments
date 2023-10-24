FROM node:18 as prod

WORKDIR /app
RUN npm install yarn
COPY package*.json .
RUN yarn build
COPY . .
EXPOSE 4400
CMD ["yarn", "prod"]