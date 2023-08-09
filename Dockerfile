FROM node:18-alpine
WORKDIR /app
COPY package*.json .
RUN npm i

COPY . .

ARG port=3000
ENV PORT=$port
EXPOSE 3000

CMD ["node", "index.js"]
