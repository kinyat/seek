FROM node:16.17.0-alpine3.15 AS builder

WORKDIR /code

COPY package.json /code
COPY package-lock.json /code

RUN npm ci

COPY . /code

RUN npm run build

RUN npm prune --production

FROM gcr.io/distroless/nodejs-debian11

WORKDIR /code

EXPOSE 3333

ENV NODE_ENV production

COPY --from=builder /code/dist /code
COPY --from=builder /code/node_modules /code/node_modules

CMD ["/code/index.js"]
