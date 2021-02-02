FROM node:15.7.0-alpine3.10

WORKDIR /app

COPY . .

RUN yarn install && npx browserslist@latest --update-db

EXPOSE 3000

CMD ["yarn", "dev"]
