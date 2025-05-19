import fs from "fs";
import path from "path";

const controllersDir = "./controllers";

fs.readdirSync(controllersDir).forEach((file) => {
  const filePath = path.join(controllersDir, file);

  // Kiểm tra nếu là file mới xử lý
  if (fs.statSync(filePath).isFile()) {
    let content = fs.readFileSync(filePath, "utf8");

    // Chuyển require('x') => import x from 'x';
    content = content.replace(
      /const (\w+) = require\(['"]([^'"]+)['"]\);?/g,
      (match, varName, modulePath) => {
        if (modulePath.startsWith("."))
          return `import ${varName} from '${modulePath}.js';`;
        return `import ${varName} from '${modulePath}';`;
      }
    );

    // Chuyển require destructuring: const { a } = require('x');
    content = content.replace(
      /const\s+{([^}]+)}\s*=\s*require\(['"]([^'"]+)['"]\);?/g,
      (match, vars, modulePath) => {
        return `import { ${vars.trim()} } from '${modulePath}';`;
      }
    );

    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ Converted ${file}`);
  }
});
