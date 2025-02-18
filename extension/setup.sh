#!/bin/bash
echo "Setting up Chrome extension and React..."

# Change to the script directory
cd "$(dirname "$0")" || { echo "ERROR: Failed to navigate to script directory!"; exit 1; }

# Verify that react-app/package.json exists
if [ ! -f "react-app/package.json" ]; then
    echo "ERROR: react-app/package.json not found."
    exit 1
fi

# Enter the react-app directory
cd react-app || exit 1

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js not installed."
    exit 1
fi

# Install dependencies if node_modules folder does not exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install --legacy-peer-deps || { echo "ERROR: npm install failed."; exit 1; }
fi

pwd

echo "Building app..."
npm run build || { echo "ERROR: Build failed."; exit 1; }

# Verify the build folder exists
if [ ! -d "build" ]; then
    echo "ERROR: Build directory not found."
    exit 1
fi

echo "Copying build files..."
rm -rf ../static
cp -r build/static ../ || { echo "ERROR: Failed to copy static files."; exit 1; }
cp build/index.html ../popup.html || { echo "ERROR: Failed to copy index.html."; exit 1; }

echo "Done! Reload your extension."
