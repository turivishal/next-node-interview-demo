FROM node:15-alpine
ARG ENV
ENV PROFILE=${ENV}
ENV NODE_ENV=${ENV}
COPY ./package.json ./
RUN apk add git
RUN npm install --production
COPY . .
EXPOSE 3015
CMD ["node","app.js"]
