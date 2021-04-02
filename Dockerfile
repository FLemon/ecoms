FROM node:12.21.0

WORKDIR /app

COPY package.json package-lock.json .

RUN npm install -g npm@6.14.11
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]
