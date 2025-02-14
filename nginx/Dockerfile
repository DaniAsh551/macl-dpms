# Use the official Bun image as a base
FROM oven/bun:latest

# Set the working directory
WORKDIR /app

# Copy source
COPY frontend /app

# Build the application
RUN bun install
RUN bun run build

# Production image
FROM nginx:alpine

# Copy the build output to Nginx's html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]