FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Install Python 3 and pip
RUN apk update && \
    apk add --no-cache python3 py3-pip

# Install Git and other dependencies
RUN apk update && apk add --no-cache git

# Copy package.json and other related files
COPY package*.json ./

# Install dependencies
RUN npm install

# Install requests module
RUN pip3 install requests
RUN pip3 install --no-cache-dir beautifulsoup4

# Copy the entire application
COPY . .

# Build the application
RUN npm run build

# Expose the application on port 8080
EXPOSE 8080

RUN ls

# Command to start the application
CMD ["npm", "run", "server:prod"]
