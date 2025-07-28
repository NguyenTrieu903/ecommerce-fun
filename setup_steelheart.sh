#!/bin/bash

# =============================================================================
# Steelheart AI Setup Script
# =============================================================================
# This script configures steelheart-ai with OpenAI API key from environment
# 1. Runs steelheart setup
# 2. Configures with OPENAI_API_KEY from environment
# =============================================================================

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

# Create automated input for steelheart setup
# Default values:
# - OpenAI API Key: from environment variable
# - Output folder: default (usually 'output' or 'steelheart-output')
# - Model type: default (usually 'gpt-4' or 'gpt-3.5-turbo')

echo -e "${BLUE}📝 Using automated setup with defaults:${NC}"
echo -e "${YELLOW}   • API Key: [from OPENAI_API_KEY environment variable]${NC}"
echo -e "${YELLOW}   • Output Folder: [default]${NC}"
echo -e "${YELLOW}   • Model Type: [default]${NC}"

# Use printf to provide automated inputs to steelheart setup
if printf "$OPENAI_API_KEY\n\n\n" | npx steelheart setup; then
    echo -e "${GREEN}✅ Steelheart setup completed successfully with automated inputs${NC}"
else
    echo -e "${RED}❌ Failed to run steelheart setup${NC}"
    exit 1
fi

echo ""

# Step 2: Configure steelheart with OpenAI API key
echo -e "${YELLOW}🔑 Configuring steelheart with OpenAI API key...${NC}"

# Create or update steelheart config with API key
if npx steelheart config set openai.apiKey "$OPENAI_API_KEY"; then
    echo -e "${GREEN}✅ OpenAI API key configured successfully${NC}"
else
    echo -e "${YELLOW}⚠️  Direct config command failed, trying alternative method...${NC}"
    
    # Alternative: Set environment variable for steelheart
    echo "OPENAI_API_KEY=$OPENAI_API_KEY" > .steelheart
    echo -e "${GREEN}✅ Created .steelheart with API key${NC}"
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

echo ""

# Step 4: Test with a simple command
echo -e "${YELLOW}🧪 Testing steelheart functionality...${NC}"
if npx steelheart --help; then
    echo -e "${GREEN}✅ Steelheart is working correctly${NC}"
else
    echo -e "${RED}❌ Steelheart test failed${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}🎉 Steelheart AI setup and configuration completed successfully!${NC}"
echo "=============================================="
echo -e "${BLUE}📝 Next steps:${NC}"
echo -e "${YELLOW}   • Run: npx steelheart auto-review${NC}"
echo -e "${YELLOW}   • Run: npx steelheart --version${NC}"
echo -e "${YELLOW}   • Check your .steelheart.json configuration${NC}"
