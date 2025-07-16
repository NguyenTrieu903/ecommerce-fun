module.exports = {
  '**/*.{js,jsx}': ['npm run lint:fix', 'npm run format'],
  '**/*.{json,css,md}': ['npm run format']
};
