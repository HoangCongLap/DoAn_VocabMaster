FROM node:lts-alpine
ENV NODE_ENV=development MONGO=mongodb://namhcn:NN12345678*@pi.nhalq.dev:10018/kimochi?authSource=admin ENV=development PORT=5000 LOGLEVEL=info
WORKDIR /usr/src/app
COPY ["package.json", "./"]
RUN npm install
COPY . .
EXPOSE 9003
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]