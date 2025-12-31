#!/bin/bash

# Script to start the development server locally
# This will install dependencies if needed and start the dev server

echo "🚀 Starting Remote Guide development server..."

# Check if node_modules exists, if not, install dependencies
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
else
  echo "✅ Dependencies already installed"
fi

# Start the development server
echo "🔥 Starting Vite dev server..."
npm run dev

