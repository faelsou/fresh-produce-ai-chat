
#!/bin/bash

# Deploy script for FindFruit
set -e

echo "🚀 Starting deployment..."

# Pull latest changes
git pull origin main

# Build and deploy with Docker Compose
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d

# Clean up old images
docker system prune -f

echo "✅ Deployment completed successfully!"
