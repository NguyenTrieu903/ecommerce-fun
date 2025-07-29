#!/bin/bash
set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🤖 Starting steelheart auto-review...${NC}"
echo "=============================================="

# Check if steelheart is configured
if ! npx steelheart --version >/dev/null 2>&1; then
    echo -e "${RED}❌ Steelheart is not configured properly${NC}"
    echo -e "${YELLOW}💡 Please run setup first: ./scripts/setup_steelheart.sh${NC}"
    exit 1
fi

# Check available branches and choose the best base
echo -e "${YELLOW}🔍 Detecting base branch for comparison...${NC}"

if git rev-parse --verify master >/dev/null 2>&1; then
    BASE_BRANCH="master"
    echo -e "${BLUE}📋 Found local master branch${NC}"
elif git rev-parse --verify main >/dev/null 2>&1; then
    BASE_BRANCH="main"
    echo -e "${BLUE}📋 Found local main branch${NC}"
elif git rev-parse --verify origin/master >/dev/null 2>&1; then
    BASE_BRANCH="origin/master"
    echo -e "${BLUE}📋 Found remote master branch${NC}"
elif git rev-parse --verify origin/main >/dev/null 2>&1; then
    BASE_BRANCH="origin/main"
    echo -e "${BLUE}📋 Found remote main branch${NC}"
else
    # If no base branch found, use include-local flag
    BASE_BRANCH=""
    echo -e "${YELLOW}⚠️  No base branch found, will analyze all local files${NC}"
fi

echo ""

# Run steelheart auto-review with appropriate options
echo -e "${YELLOW}🚀 Running steelheart auto-review...${NC}"

if [ -n "$BASE_BRANCH" ]; then
    echo -e "${BLUE}🔄 Using base branch: $BASE_BRANCH${NC}"
    if npx steelheart auto-review --base "$BASE_BRANCH"; then
        echo -e "${GREEN}✅ Auto-review completed successfully${NC}"
        REVIEW_SUCCESS=true
    else
        echo -e "${YELLOW}⚠️  Auto-review with base branch failed, trying with local files...${NC}"
        if npx steelheart auto-review; then
            echo -e "${GREEN}✅ Auto-review completed successfully (fallback mode)${NC}"
            REVIEW_SUCCESS=true
        else
            echo -e "${YELLOW}⚠️  Auto-review completed with warnings${NC}"
            REVIEW_SUCCESS=false
        fi
    fi
else
    echo -e "${BLUE}📋 No base branch found, analyzing all local files...${NC}"
    if npx steelheart auto-review; then
        echo -e "${GREEN}✅ Auto-review completed successfully${NC}"
        REVIEW_SUCCESS=true
    else
        echo -e "${YELLOW}⚠️  Auto-review completed with warnings${NC}"
        REVIEW_SUCCESS=false
    fi
fi

echo ""

# Navigate to output directory and show results
echo -e "${YELLOW}📁 Checking review output...${NC}"

if [ -d "./steelheart-output" ]; then
    cd ./steelheart-output || { 
        echo -e "${RED}❌ Failed to change directory to ./steelheart-output${NC}"
        exit 1
    }
    
    echo -e "${BLUE}📋 Review output files:${NC}"
    ls -la
    
    echo ""
    echo -e "${GREEN}🎉 Auto-review process completed!${NC}"
    echo -e "${BLUE}💡 Check the files above for detailed review results${NC}"
fi
