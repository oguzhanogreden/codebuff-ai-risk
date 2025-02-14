#!/bin/zsh

# Exit immediately if a command exits with a non-zero status
set -e

# Define variables
BUILD_DIR="client/dist" 
SERVER_USER="ozanogreden"
SERVER_IP="172.235.165.141"
SERVER_DEST="/home/ozanogreden/nginx-conf/nginx-webroot/ai-risk-richter-scale" 

# Build the site
echo "Building the site..."
deno run client:build:prod

# Deploy to the server
echo "Deploying to the server..."
scp -r $BUILD_DIR/* $SERVER_USER@$SERVER_IP:$SERVER_DEST

# Completion message
echo "Deployment complete!"