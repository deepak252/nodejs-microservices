FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

# RUN npm install --production
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]

# TODO: Multi stage build
