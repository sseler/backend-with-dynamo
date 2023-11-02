#!/bin/sh

echo "DEV is set to: $DEV"

if [ ! -d node_modules ]; then
    echo "node_modules missing, installing dependencies..."
    npm install
fi

if [ $DEV = 1 ]; then
    npm run debug
else
    npm run server
fi