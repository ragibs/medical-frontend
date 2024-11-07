# Use a lightweight Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the development server port
EXPOSE 3000

# Start the Next.js application in development mode
CMD ["npm", "run", "dev"]

# To run this on Docker, run the following command:
# Build the Docker image with the name 'medical_app' and tag 'latest'
# docker build -t  medical_app:latest .
# Run the Docker container with a specific name 'medical_app_container' mapping port 3000 from the container to port 3000 on the host
# docker run -p 3000:3000 --name medical_app_container medical_app:latest
# To stop the container, run the following command:
# docker stop medical_app_container
# To remove the container, run the following command:
# docker rm medical_app_container
# to start the container, run the following command:
# docker start medical_app_container