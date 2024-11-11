# Use an official Node.js image as the base
FROM node:20

# Set the working directory
WORKDIR /usr/src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

# Install TypeScript globally
RUN npm install -g typescript

RUN tsc

# Copy the rest of the application files


# Expose the port the app runs on
EXPOSE 4001  

# Define environment variables in container


# Run the app with 'npm run dev' using nodemon
CMD ["npm", "start"]
