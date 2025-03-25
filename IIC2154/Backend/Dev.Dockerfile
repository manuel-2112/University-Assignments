# Use the official Node.js 16 image as a parent image.
FROM node:16-alpine

# Install Python 3 and pip
RUN apk update && \
    apk add --no-cache python3 py3-pip

# Install Git (and any other necessary packages here)
RUN apk update && \
    apk add --no-cache git

# Set the working directory inside the container to /app.
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory.
COPY package*.json ./

# Install project dependencies.
RUN npm install

# Install requests module
RUN pip3 install requests
RUN pip3 install --no-cache-dir beautifulsoup4

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Inform Docker that the container listens on the specified network ports at runtime.
EXPOSE 8080

# Define the command to run your app using CMD which defines your runtime.
CMD ["npm", "run", "start"]
