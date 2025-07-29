#!/bin/bash
set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔧 Starting steelheart-ai setup and configuration...${NC}"
echo "=============================================="

# Check if OPENAI_API_KEY is set
if [ -z "$OPENAI_API_KEY" ]; then
    echo -e "${RED}❌ OPENAI_API_KEY environment variable is not set${NC}"
    echo -e "${YELLOW}💡 Please set your OpenAI API key:${NC}"
    echo -e "${YELLOW}   export OPENAI_API_KEY='your-api-key-here'${NC}"
    echo -e "${YELLOW}   Or add it to your ~/.bashrc or ~/.zshrc file${NC}"
    exit 1
fi

echo -e "${GREEN}✅ OPENAI_API_KEY found in environment${NC}"
echo ""

# Step 1: Run steelheart setup with automated inputs
echo -e "${YELLOW}🚀 Running steelheart setup with automated inputs...${NC}"

echo -e "${BLUE}📝 Using automated setup with defaults:${NC}"
echo -e "${YELLOW}   • API Key: [from OPENAI_API_KEY environment variable]${NC}"
echo -e "${YELLOW}   • Output Folder: [default]${NC}"
echo -e "${YELLOW}   • Model Type: [default]${NC}"

# Step 2: Create steelheart configuration
echo -e "${BLUE}📋 Creating steelheart configuration...${NC}"

# Create steelheart config directory if it doesn't exist
mkdir -p ~/.steelheart

# Create config file directly
cat > ~/.steelheart/config.json << EOF
{
  "openai": {
    "apiKey": "$OPENAI_API_KEY"
  },
  "outputDir": "./steelheart-output",
  "model": "gpt-4o-mini"
}
EOF

# Also create local config
cat > .steelheart.json << EOF
{
  "openai": {
    "apiKey": "$OPENAI_API_KEY"
  },
  "outputDir": "./steelheart-output",
  "model": "gpt-4o-mini"
}
EOF

echo -e "${GREEN}✅ Steelheart configuration created successfully${NC}"

# Test if steelheart can read the config
if npx steelheart --version >/dev/null 2>&1; then
    echo -e "${GREEN}✅ Steelheart setup completed successfully${NC}"
else
    echo -e "${YELLOW}⚠️  Manual setup may be required${NC}"
    echo -e "${BLUE}💡 If needed, run: npx steelheart setup${NC}"
fi

echo ""

# Step 3: Verify configuration
echo -e "${YELLOW}🔍 Verifying steelheart configuration...${NC}"
if npx steelheart --version; then
    echo -e "${GREEN}✅ Steelheart is configured and ready to use${NC}"
else
    echo -e "${RED}❌ Steelheart configuration verification failed${NC}"
    exit 1
fi
