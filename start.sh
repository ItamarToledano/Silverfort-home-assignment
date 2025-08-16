#!/bin/bash

echo "🎮 Starting Multisession Game..."

# Check if all package.json files exist
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found in root directory"
    exit 1
fi

if [ ! -f "shared-types/package.json" ]; then
    echo "❌ Error: shared-types/package.json not found"
    exit 1
fi

if [ ! -f "client/package.json" ]; then
    echo "❌ Error: client/package.json not found"
    exit 1
fi

if [ ! -f "server/package.json" ]; then
    echo "❌ Error: server/package.json not found"
    exit 1
fi

echo "🚀 Starting both servers with npm run dev..."
npm run dev

echo "✅ Servers started!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔌 Backend: http://localhost:3001"
