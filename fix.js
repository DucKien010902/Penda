import fs from 'fs';
import path from 'path';

/**
 * Thêm hậu tố `.js` vào các import nội bộ chưa có.
 */
function fixImportsInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fixedContent = content.replace(
    /import\s+(.*?)\s+from\s+['"](\..*?)(?<!\.js)['"]/g,
    (match, imports, modulePath) => {
      return `import ${imports} from '${modulePath}.js'`;
    }
  );
  if (fixedContent !== content) {
    console.log(`✅ Fixed imports in: ${filePath}`);
    fs.writeFileSync(filePath, fixedContent);
  }
}

/**
 * Đệ quy tìm tất cả file `.js` trong thư mục.
 */
function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (file.endsWith('.js')) {
      fixImportsInFile(fullPath);
    }
  }
}

// 👉 Chạy script từ root project
const rootDirs = ['./routes'];

for (const dir of rootDirs) {
  if (fs.existsSync(dir)) {
    walk(dir);
  }
}
