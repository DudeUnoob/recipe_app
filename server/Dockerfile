# Dockerfile for Node.js app
FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose port and start the application
EXPOSE 3000
CMD [ "npm", "start" ]
