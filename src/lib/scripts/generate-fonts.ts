import * as fs from 'fs';
import * as path from 'path';
import { exit } from 'process';

const fontsDir = path.join(__dirname, '../fonts');
const outputCssPath = path.join(fontsDir, 'generated-fonts.css');
const fontConfigPath = path.join(__dirname, 'fonts.json');

/**
 * Utility to generate a @font-face rule.
 */
const generateFontFace = (
  filename: string,
  folderName: string,
  extension: string = 'woff2',
) => {
  const fontName = path.basename(filename, `.${extension}`);
  const formatType = extension === 'ttf' ? 'truetype' : extension;
  return `
  @font-face {
    font-family: '${fontName}';
    src: url('/fonts/${folderName}/${filename}') format('${formatType}');
  }
`;
};

/**
 * Utility to generate a Font Family ClassName.
 */
const generateFontFamilyClassNames = (
  filename: string,
  extension: string = 'woff2',
) => {
  const fontName = path.basename(filename, `.${extension}`);
  const fontId = fontName
    .split('-')[1]
    .replace(/([a-z])([A-Z])/g, '$1-$2')     // insert hyphen between camelCase transitions
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2') // handle ALLCAPS-to-Camel transitions
    .toLowerCase();

  const className = `font-brand-${fontId}`;
  console.log(`Generating Font Family ClassName ${className}`);

  return `
  .${className} {
    font-family: '${fontName}', 'sans-serif';
  }
`;
};

/**
 * Processes all .woff2 files in a given folder.
 * Returns generated CSS and a mapping of base font-name to sub-font variants.
 */
const processFonts = (folderName: string) => {
  const folderPath = path.join(fontsDir, folderName);
  const fontFiles = fs.readdirSync(folderPath);

  let cssContent = '';
  const fontFamilies: Record<string, string[]> = {};

  fontFiles.forEach((file) => {
    console.log('Processing file:', file);
    const extension = file.split('.').pop();

    const fontName = path.basename(file, `.${extension}`);
    console.log(`Generating font-face (.${extension}):`, fontName);

    cssContent += generateFontFace(file, folderName);
    cssContent += generateFontFamilyClassNames(file);

    // Use the part before a dash (-) as the "baseName".
    // Example: "Roboto-Bold" => baseName = "Roboto"
    const baseName = fontName.split('-')[0];
    fontFamilies[baseName] = fontFamilies[baseName] || [];
    fontFamilies[baseName].push(fontName);
  });

  return { cssContent, fontFamilies };
};

const generateFonts = () => {
  // Ensure the fonts directory exists:
  if (!fs.existsSync(fontsDir)) {
    console.error('No "fonts" directory found. Exiting...');
    exit(-1);
  }

  // Read all subfolders in ../fonts
  const subfolders = fs
    .readdirSync(fontsDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  if (subfolders.length === 0) {
    console.warn(
      'No subfolders found inside "fonts" directory. Nothing to do.',
    );
    exit(0);
  }

  // Accumulate results from each subfolder
  let finalCssContent = '';
  const allFontFamilies: Record<string, string[]> = {};

  subfolders.forEach((folderName) => {
    // Skip hidden directories or special cases if needed
    if (folderName.startsWith('.')) return;

    const folderPath = path.join(fontsDir, folderName);
    if (!fs.existsSync(folderPath)) return;

    const { cssContent, fontFamilies } = processFonts(folderName);
    finalCssContent += cssContent;

    // Merge each folder's font families into the master list
    Object.keys(fontFamilies).forEach((baseName) => {
      if (!allFontFamilies[baseName]) {
        allFontFamilies[baseName] = [];
      }
      // Add the sub-styles to the baseName array
      allFontFamilies[baseName].push(...fontFamilies[baseName]);
    });
  });

  // Ensure we have an output directory
  if (!fs.existsSync(fontsDir)) {
    fs.mkdirSync(fontsDir, { recursive: true });
  }

  // Write out the CSS (removing excessive whitespace)
  fs.writeFileSync(outputCssPath, finalCssContent.replace(/\s+/g, ' ').trim());

  // Write out the font families JSON
  fs.writeFileSync(
    fontConfigPath,
    JSON.stringify({ fontFamilies: allFontFamilies }, null, 2),
  );

  console.log(`\nDone! Font Generation Finished!"`);
};

generateFonts();
