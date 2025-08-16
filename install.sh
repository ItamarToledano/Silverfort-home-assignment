#!/bin/bash

echo "🚀 Installing Multisession Game Dependencies..."

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd client
npm install
cd ..

echo "✅ All dependencies installed successfully!"
echo ""
echo "🎮 To start the game:"
echo "1. Start backend: npm run server:dev"
echo "2. Start frontend: cd client && npm start"
echo "3. Or use: npm run dev (starts both)"
echo ""
echo "🌐 Game will be available at: http://localhost:3000"
echo "🔌 Backend runs at: http://localhost:3001"
