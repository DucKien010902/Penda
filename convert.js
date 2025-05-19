// convert-models-to-esm.js
import fs from "fs";
import path from "path";

const modelsDir = "./models";

fs.readdirSync(modelsDir).forEach((file) => {
  const filePath = path.join(modelsDir, file);
  let content = fs.readFileSync(filePath, "utf8");

  // Tìm phần module.exports = mongoose.model("Bill", billSchema);
  const exportRegex = /module\.exports\s*=\s*mongoose\.model\(["'](\w+)["']\s*,\s*(\w+)\);?/;

  const match = content.match(exportRegex);
  if (match) {
    const [fullMatch, modelName, schemaVar] = match;

    // Thêm const Model = mongoose.model(...) và export default
    const replacement = `const ${modelName} = mongoose.model("${modelName}", ${schemaVar});\nexport default ${modelName};`;
    const newContent = content.replace(fullMatch, replacement);

    fs.writeFileSync(filePath, newContent, "utf8");
    console.log(`✅ Converted ${file}`);
  }
});
