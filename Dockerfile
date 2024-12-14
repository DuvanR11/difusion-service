# BASE IMAGE FOR THE BUILDER STAGE
FROM node:20-alpine3.18 as builder

# Enable Corepack and prepare PNPM
RUN corepack enable && corepack prepare pnpm@latest --activate
ENV PNPM_HOME=/usr/local/bin

# Set the working directory
WORKDIR /app

# Copy package.json and lock file
COPY package*.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the files
COPY . .

# Compile the source code (if using TypeScript or another build tool)
RUN pnpm build

# DEPLOYMENT STAGE
FROM node:20-alpine3.18 as deploy

# Set the working directory
WORKDIR /app

# Copy only necessary files for deployment
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Start the application
CMD ["node", "./dist/app.js"]
