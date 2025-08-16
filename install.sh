#!/bin/bash

echo "Installing root dependencies"
npm install

echo "Installing and building shared types"
cd shared-types
npm install
npm run build
cd ..

echo "Installing server dependencies"
cd server
npm install
cd ..

echo "Installing and building client dependencies"
cd client
npm install
npm run build
cd ..

echo "All dependencies installed and built successfully!"