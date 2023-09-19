FROM node:16.20.1
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build
EXPOSE 3000