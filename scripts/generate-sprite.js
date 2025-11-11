// scripts/generate-sprite.js
const fs = require("fs");
const path = require("path");
const { optimize } = require("svgo");
const SVGSpriter = require("svg-sprite");

console.log("🔄 Starting SVG sprite generation...");

const config = {
  mode: {
    symbol: {
      sprite: "sprite.svg",
      example: false,
    },
  },
  shape: {
    id: {
      generator: (name, file) => {
        const iconName = path.basename(file.path, ".svg");
        return `icon-${iconName}`;
      },
    },
  },
};

const spriter = new SVGSpriter(config);

// Пути
const iconsDir = path.join(process.cwd(), "src", "assets", "icons");
const outputDir = path.join(process.cwd(), "public", "sprite");

// Читаем все SVG файлы
const iconFiles = fs
  .readdirSync(iconsDir)
  .filter((file) => file.endsWith(".svg"));


if (iconFiles.length === 0) {
  console.log("❌ No SVG icons found in", iconsDir);
  process.exit(1);
}

// Добавляем каждый SVG в спрайт
iconFiles.forEach((file) => {
  const filePath = path.join(iconsDir, file);

  try {
    const svgContent = fs.readFileSync(filePath, "utf8");

    spriter.add(filePath, file, svgContent);
  } catch (error) {
    console.log(`❌ Error reading ${file}:`, error.message);
  }
});

// Генерируем спрайт
spriter.compile((error, result) => {
  if (error) {
    console.error("❌ Error generating sprite:", error);
    return;
  }

  // Создаем папку если не существует
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Сохраняем спрайт
  const sprite = result.symbol.sprite;
  fs.writeFileSync(path.join(outputDir, "sprite.svg"), sprite.contents);

  console.log(`✅ SVG sprite generated with ${iconFiles.length} icons`);
  console.log(
    `📏 Sprite size: ${sprite.contents.length / 1024} KB`
  );
});
