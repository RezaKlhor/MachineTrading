FROM node:18-alpine
WORKDIR /app
COPY package*.json .

COPY . .
COPY node_modules .
ARG port=3000
ENV PORT=$port
EXPOSE 3000

CMD ["node", "index.js"]
