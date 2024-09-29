#!/bin/bash

SPEC_FILE="/home/ajaykumar/qsgbtest/cypress/e2e/L requestswith%.cy.js"
TIMES=10
SERVER_COMMAND="npx cypress open " # Replace with your actual command to start the server

# Start the server
echo "Starting the server..."
$SERVER_COMMAND &
SERVER_PID=$!

# Wait for the server to start
sleep 10 # Adjust the sleep time if needed

for ((i=1; i<=TIMES; i++))
do
  echo "Running test iteration $i"
  npx cypress run --spec "$SPEC_FILE"
done

# Optionally, stop the server if needed
kill $SERVER_PID
