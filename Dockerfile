FROM node:14 AS builder 
WORKDIR /usr/src/app
COPY package.json .
COPY npm install 
COPY . .
RUN npm run build

FROM nginx:latest AS runner
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000