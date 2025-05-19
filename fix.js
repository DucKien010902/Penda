// fix-imports.js
import fs from 'fs';
import path from 'path';

function fixImportsInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fixedContent = content.replace(
    /import\s+(.*?)\s+from\s+['"](\..*?)(?<!\.js)['"]/g,
    (match, p1, p2) => `import ${p1} from '${p2}.js'`
  );
  fs.writeFileSync(filePath, fixedContent);
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) walk(fullPath);
    else if (file.endsWith('.js')) fixImportsInFile(fullPath);
  }
}

// Gọi thư mục src hoặc nơi bạn chứa code
walk('./cron');
