# syntax=docker.io/docker/dockerfile:1

FROM node:22-bullseye

# Install libc6-compat (needed by some Node packages)
#RUN apk add --no-cache libc6-compat
#RUN apk add --no-cache python3 make g++
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy only package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy rest of the project files
COPY . .

# Expose port used by Next.js
EXPOSE 9229
EXPOSE 9230
EXPOSE 3000

# Set environment variables
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# Run in development mode
# CMD ["npm", "run", "dev"]
#CMD ["node", "--inspect=0.0.0.0:9229", "node_modules/next/dist/bin/next", "dev"]
CMD ["/bin/sh", "-c", "npm install && npm run dev"]


