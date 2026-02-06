FROM node:20-alpine AS builder
WORKDIR /usr/code
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /usr/code
COPY --from=builder /usr/code/package*.json ./
RUN npm install --only=production
COPY --from=builder /usr/code/dist ./dist
EXPOSE 3000
CMD ["npm", "run", "start"]