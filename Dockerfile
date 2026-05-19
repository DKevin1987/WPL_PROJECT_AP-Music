FROM mcr.microsoft.com/devcontainers/typescript-node:1-20-bullseye
WORKDIR /workspaces/app
COPY package*.json ./
RUN npm install && npm install -g nodemon
COPY . .
EXPOSE 3000
CMD ["nodemon", "ts-node", "index.ts"]