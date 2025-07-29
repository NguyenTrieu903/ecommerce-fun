#!/bin/bash
set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🤖 Starting steelheart gen-tests...${NC}"
echo "=============================================="
echo -e "${YELLOW}🚀 Running steelheart gen-tests...${NC}"
npx steelheart gen-tests
