#!/bin/bash
set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🤖 Starting steelheart branch-docs...${NC}"
echo "=============================================="

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

echo -e "${YELLOW}🚀 Running steelheart branch-docs...${NC}"

if [ -n "$BASE_BRANCH" ]; then
    echo -e "${BLUE}🔄 Using base branch: $BASE_BRANCH${NC}"
    if npx steelheart branch-docs --base "$BASE_BRANCH"; then
        echo -e "${GREEN}✅ Branch documentation completed successfully${NC}"
        REVIEW_SUCCESS=true
    else
        echo -e "${YELLOW}⚠️  Branch documentation with base branch failed, trying with local files...${NC}"
        if npx steelheart branch-docs; then
            echo -e "${GREEN}✅ Branch documentation completed successfully (fallback mode)${NC}"
            REVIEW_SUCCESS=true
        else
            echo -e "${YELLOW}⚠️  Branch documentation completed with warnings${NC}"
            REVIEW_SUCCESS=false
        fi
    fi
else
    echo -e "${BLUE}📋 No base branch found, analyzing all local files...${NC}"
    if npx steelheart branch-docs; then
        echo -e "${GREEN}✅ Branch documentation completed successfully${NC}"
        REVIEW_SUCCESS=true
    else
        echo -e "${YELLOW}⚠️  Branch documentation completed with warnings${NC}"
        REVIEW_SUCCESS=false
    fi
fi
