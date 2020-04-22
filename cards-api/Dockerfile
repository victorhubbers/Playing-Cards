FROM node:alpine
COPY . /app
RUN cd /app && npm install
ENTRYPOINT cd /app && npm run start
EXPOSE 3000

