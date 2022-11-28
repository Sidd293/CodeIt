FROM frolvlad/alpine-python-machinelearning:latest



## Install Node

RUN apk add --update nodejs npm
RUN apk add --update npm


WORKDIR /app


COPY package*.json ./





RUN npm install

COPY . .


