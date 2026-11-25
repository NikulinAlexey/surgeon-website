import fs from "node:fs";
import path from "node:path";
import SVGSpriter from "svg-sprite";

const config = {
  mode: {
    symbol: {
      sprite: "sprite.svg",
      example: false,
    },
  },
  shape: {
    id: {
      generator: (_name, file) => `icon-${path.basename(file.path, ".svg")}`,
    },
  },
};

const spriter = new SVGSpriter(config);
const iconsDir = path.join(process.cwd(), "src", "assets", "icons");
const outputDir = path.join(process.cwd(), "public", "sprite");
const iconFiles = fs
  .readdirSync(iconsDir)
  .filter((file) => file.endsWith(".svg"));

if (iconFiles.length === 0) {
  throw new Error(`No SVG icons found in ${iconsDir}`);
}

for (const file of iconFiles) {
  const filePath = path.join(iconsDir, file);
  spriter.add(filePath, file, fs.readFileSync(filePath, "utf8"));
}

const { result } = await spriter.compileAsync();
const sprite = result.symbol.sprite;
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, "sprite.svg"), sprite.contents);
console.log(
  `SVG sprite generated: ${iconFiles.length} icons, ${Math.round(sprite.contents.length / 1024)} KB`,
);
