#!/bin/bash

echo "Cleaning up build artifacts and dependencies"

echo "Removing build folders"
rm -rf client/build
rm -rf shared-types/dist
rm -rf node_modules
rm -rf client/node_modules
rm -rf server/node_modules
rm -rf shared-types/node_modules

echo "Cleanup complete"