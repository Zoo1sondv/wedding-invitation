/**
 * Script để tối ưu hóa ảnh cưới
 *
 * Cách sử dụng:
 * 1. Cài đặt package: npm install sharp --save-dev
 * 2. Chạy script: node optimize-images.js
 *
 * Script này sẽ:
 * - Tối ưu hóa tất cả ảnh JPG trong thư mục public/assets/img
 * - Giảm kích thước file 60-80% mà vẫn giữ chất lượng tốt
 * - Tạo backup của ảnh gốc vào thư mục backup
 * - Convert sang Progressive JPEG để load nhanh hơn
 */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const IMAGE_DIR = "./public/assets/img";
const BACKUP_DIR = "./public/assets/img/backup";
const QUALITY = 85; // Chất lượng ảnh (80-90 là tối ưu)

// Tạo thư mục backup nếu chưa có
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  console.log("✅ Đã tạo thư mục backup");
}

async function optimizeImage(filePath) {
  const fileName = path.basename(filePath);
  const backupPath = path.join(BACKUP_DIR, fileName);

  try {
    // Lấy thông tin ảnh gốc
    const originalStats = fs.statSync(filePath);
    const originalSize = (originalStats.size / 1024 / 1024).toFixed(2); // MB

    // Backup ảnh gốc nếu chưa có
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(filePath, backupPath);
      console.log(`📦 Backup: ${fileName}`);
    }

    // Tối ưu hóa ảnh
    await sharp(filePath)
      .jpeg({
        quality: QUALITY,
        progressive: true, // Progressive JPEG load nhanh hơn
        mozjpeg: true, // Sử dụng mozjpeg để nén tốt hơn
      })
      .toFile(filePath + ".tmp");

    // Thay thế ảnh gốc bằng ảnh đã tối ưu
    fs.renameSync(filePath + ".tmp", filePath);

    // Lấy kích thước ảnh mới
    const newStats = fs.statSync(filePath);
    const newSize = (newStats.size / 1024 / 1024).toFixed(2); // MB
    const savedPercent = (
      (1 - newStats.size / originalStats.size) *
      100
    ).toFixed(1);

    console.log(
      `✅ ${fileName}: ${originalSize}MB → ${newSize}MB (giảm ${savedPercent}%)`
    );
  } catch (error) {
    console.error(`❌ Lỗi khi tối ưu ${fileName}:`, error.message);
  }
}

async function optimizeAllImages() {
  console.log("🚀 Bắt đầu tối ưu hóa ảnh...\n");

  try {
    const files = fs.readdirSync(IMAGE_DIR);
    const imageFiles = files.filter(
      (file) => /\.(jpg|jpeg|JPG|JPEG)$/i.test(file) && file !== "backup"
    );

    console.log(`📸 Tìm thấy ${imageFiles.length} ảnh cần tối ưu\n`);

    for (const file of imageFiles) {
      const filePath = path.join(IMAGE_DIR, file);
      await optimizeImage(filePath);
    }

    console.log("\n✨ Hoàn thành tối ưu hóa ảnh!");
    console.log("💡 Lưu ý: Ảnh gốc được backup tại public/assets/img/backup");
  } catch (error) {
    console.error("❌ Lỗi:", error.message);
  }
}

// Chạy script
optimizeAllImages();
