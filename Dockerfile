# Use the official Node.js LTS (Long Term Support) image as the base
FROM node:lts

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the React app
RUN npm run build

# Set the command to start the React app
CMD [ "npm", "start" ]