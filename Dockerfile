FROM node:18-alpine

WORKDIR /app

# This is done to avoid rebuilding the image without a change in package.json
COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
