FROM gcc:latest

RUN apt-get update && \
    apt-get install -y --no-install-recommends apt-utils && \
    apt-get install -y build-essential apt-transport-https ca-certificates curl gnupg2 software-properties-common tar bash git && \
    apt-get clean

## Install Node
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs

# Neustes npm & npx
RUN npm install -g npm@latest npx@latest node-gyp --force --verbose
SHELL ["/bin/bash", "-c"]
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .


