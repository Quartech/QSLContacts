#!/bin/bash

cat <<-EOF

Usage: [option]

By default the script build the frontend/backend docker images for dev.

options:

-p Build the frontend/backend docker images for production

EOF

# Bring down any previously running containers
docker-compose down
docker rmi frontend-qsl-contacts backend-qsl-contacts

if [ "$1" = "-p" ];
then
    echo "Building PRODUCTION"
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
    
else
    echo "Building DEV"
    docker-compose up
fi
