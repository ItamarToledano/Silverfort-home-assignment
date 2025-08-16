#!/bin/bash

echo "🚀 Installing Multisession Game Dependencies..."

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install
cd ..

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
cd ..

echo "✅ All dependencies installed successfully!"
echo ""
echo "🎮 To start the game:"
echo "1. Start both: npm run dev"
echo "2. Start server only: npm run server:dev"
echo "3. Start client only: npm run client:dev"
echo ""
echo "🌐 Game will be available at: http://localhost:3000"
echo "🔌 Backend runs at: http://localhost:3001"
