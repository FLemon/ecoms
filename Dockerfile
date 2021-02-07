FROM node:15.7.0-alpine3.10

WORKDIR /app

COPY . .

RUN npx browserslist@latest --update-db && npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]
