FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN addgroup -g 1001 -S nodejs
RUN adduser -S mcp -u 1001

RUN chown -R mcp:nodejs /app
USER mcp

CMD ["npm", "start"] 