FROM node:11.4.0

RUN mkdir -p /usr/src/app
WORKDIR /user/src/app

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]