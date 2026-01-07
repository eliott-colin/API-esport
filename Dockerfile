FROM node:20.19.2-alpine
WORKDIR /app
COPY package.json package-lock.json /prisma ./

RUN npm ci
COPY . .
EXPOSE 3000

CMD ["npm", "start"]