# Use the latest node LTS
FROM node:carbon

# Run from this directory
WORKDIR /usr/src/app

# Copy package file
COPY package*.json ./

# Install dependencies
RUN npm install

# TODO: for PROD builds...
# RUN npm install --only=production

# Copy everything over
COPY . .

# Build
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["npm","start"]
