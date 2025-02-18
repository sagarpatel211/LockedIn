#!/bin/bash
echo "Setting up Chrome extension and React..."

cd "$(dirname "$0")" || { echo "ERROR: Failed to navigate to script directory!"; exit 1; }

if [ ! -f "react-app/package.json" ]; then
    echo "ERROR: react-app/package.json not found."
    exit 1
fi

cd react-app || exit 1

if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js not installed."
    exit 1
fi

if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

echo "Building app..."
npm run build

echo "Copying build files..."
rm -rf ../static
cp -r build/static ../
cp build/index.html ../popup.html

echo "Done! Reload your extension."
