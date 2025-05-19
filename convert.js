// convert-models.js
import fs from "fs";
import path from "path";

const modelsDir = "./models";

fs.readdirSync(modelsDir).forEach((file) => {
  const filePath = path.join(modelsDir, file);
  let content = fs.readFileSync(filePath, "utf8");

  // Nếu có module.exports
  if (content.includes("module.exports = mongoose.model")) {
    const modelMatch = content.match(
      /module\.exports\s*=\s*mongoose\.model\("([^"]+)",\s*(\w+)\);/
    );
    if (modelMatch) {
      const [fullMatch, modelName, schemaVar] = modelMatch;

      // Thêm const Model = mongoose.model(...) và export default
      const newContent =
        content.replace(fullMatch, `const ${modelName} = mongoose.model("${modelName}", ${schemaVar});\nexport default ${modelName};`);

      fs.writeFileSync(filePath, newContent);
      console.log(`✅ Converted ${file}`);
    }
  }
});
