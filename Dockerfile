FROM node:18-alpine
WORKDIR /bookscroll
COPY . .
RUN npm install 
CMD ["npm", "run","start"]
EXPOSE 3000