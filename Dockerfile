FROM node:12

WORKDIR /app

COPY package.json .

RUN npm install -g npm && npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]
