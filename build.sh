#!/bin/bash
# Colors
RED='\033[1;31m'
GREEN='\033[0;32m'
VIOLET='\033[0;95m'
BLUE='\033[1;94m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color/Clear

# Switch to the folder this file is in
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd $SCRIPT_DIR

docker build -t tds-quiz:1.0.0 -t tds-quiz:latest .

if [ $? -ne 0 ]; then 
  echo -e "${RED}Build failed.${NC}"
  exit 1
fi 

echo -e "${GREEN}Done!${NC}"
