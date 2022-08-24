FROM node:16.17.0-alpine3.15 AS builder

RUN apk add --no-cache git

WORKDIR /code

COPY package.json /code
COPY package-lock.json /code

RUN npm ci

COPY . /code

RUN npm run build

RUN npm prune --production

RUN git rev-parse HEAD | tee /code/dist/app/meta/gitsha

FROM gcr.io/distroless/nodejs-debian11

WORKDIR /code

EXPOSE 3333

ENV NODE_ENV production

COPY --from=builder /code/dist /code
COPY --from=builder /code/node_modules /code/node_modules

CMD ["/code/index.js"]
