FROM node:16-buster as build
WORKDIR /opt/build
ARG NODE_ENV=development
RUN apt-get update
COPY package.json .
RUN npm install
COPY src .
COPY public .
COPY tsconfig.json .
RUN npm run build

FROM node:16-buster
WORKDIR /opt/sudoku
ARG NODE_ENV=production
RUN apt-get update
COPY package.json .
RUN npm install
COPY --from=build /opt/build/dist/* /opt/sudoku/

CMD ['npm', 'run', 'production']