#!/bin/bash

command_exists() {
  command -v "$1" >/dev/null 2>&1
}

YELLOW='\033[1;33m'
GREEN='\033[1;32m'
RED='\033[1;31m'
CYAN='\033[1;36m'
NC='\033[0m'

logo() {
    echo -e "${CYAN}
   __                  __
  / /__________ ______/ /_____  _____
 / __/ ___/ __ \`/ ___/ //_/ _ \/ ___/
/ /_/ /  / /_/ / /__/ ,< /  __/ /
\__/_/   \__,_/\___/_/|_|\___/_/
"
}


clear
logo
echo -e "${YELLOW}Installing Node.js...${NC}"
if pkg install -y nodejs; then
  echo -e "${GREEN}Node.js installed successfully!${NC}"
else
  echo -e "${RED}Error installing Node.js!${NC}"
  exit 1
fi


if [ ! -f "package.json" ]; then
  echo -e "${RED}package.json not found!${NC}"
  exit 1
fi

clear
logo
echo -e "${YELLOW}Installing project dependencies...${NC}"
if npm install; then
  echo -e "${GREEN}Project dependencies installed successfully!${NC}"
else
  echo -e "${RED}Error installing project dependencies!${NC}"
  exit 1
fi

clear

echo -e "${YELLOW}Running tracker.js...${NC}"
sleep 2
cd src
clear
node tracker.js
