/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const clearCache = () => {
  console.log('Deleting .next folder');

  const dir = path.join('.next');
  fs.rmSync(dir, { recursive: true, force: true });

  console.log('.next folder deleted');
}

clearCache();