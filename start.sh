#!/bin/bash

echo "🎮 Starting Multisession Game..."

# Check if both package.json files exist
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found in root directory"
    exit 1
fi

if [ ! -f "client/package.json" ]; then
    echo "❌ Error: client/package.json not found"
    exit 1
fi

echo "🔌 Starting NestJS backend server..."
npm run server:dev &
BACKEND_PID=$!

echo "🌐 Starting React frontend server..."
cd client
npm start &
FRONTEND_PID=$!
cd ..

echo "✅ Both servers started!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔌 Backend: http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
trap "echo '🛑 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
