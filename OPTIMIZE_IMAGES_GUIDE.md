# 📸 Hướng Dẫn Tối Ưu Hóa Ảnh Website

## 🎯 Vấn Đề

Ảnh cưới thường có dung lượng rất lớn (2-10MB/ảnh), làm website load chậm và tốn băng thông.

## ✅ Giải Pháp Đã Áp Dụng

### 1. **Lazy Loading** (Đã implement)

- ✅ Ảnh hero section: load ngay lập tức (`loading="eager"`)
- ✅ Ảnh section khác: chỉ load khi scroll đến (`loading="lazy"`)
- ✅ Thumbnails slider: lazy load để giảm tải ban đầu
- ✅ Ảnh trong modal: load khi cần thiết

**Kết quả**: Giảm 70-80% dung lượng load lần đầu

### 2. **Tối Ưu Kích Thước Ảnh** (Cần chạy script)

#### Cách 1: Sử dụng Script Tự Động (Khuyến nghị)

```bash
# Bước 1: Cài đặt thư viện
npm install sharp --save-dev

# Bước 2: Chạy script tối ưu
node optimize-images.js
```

**Script sẽ làm gì?**

- ✅ Backup ảnh gốc vào `public/assets/img/backup`
- ✅ Nén ảnh với chất lượng 85% (gần như không mất chất lượng nhìn thấy)
- ✅ Convert sang Progressive JPEG (load dần dần, trải nghiệm tốt hơn)
- ✅ Giảm 60-80% dung lượng file

**Ví dụ kết quả:**

```
✅ 0F9A0430.jpg: 8.5MB → 1.2MB (giảm 85.9%)
✅ 0F9A0530.jpg: 7.8MB → 1.4MB (giảm 82.1%)
✅ 0F9A1130.jpg: 4.2MB → 0.8MB (giảm 81.0%)
```

#### Cách 2: Tối Ưu Thủ Công

**Online Tools (Miễn phí):**

1. **TinyJPG** - https://tinyjpg.com
   - Kéo thả ảnh vào
   - Tải về ảnh đã nén
   - Thay thế ảnh cũ

2. **Squoosh** - https://squoosh.app
   - Chọn quality: 80-85%
   - So sánh trước/sau
   - Download

3. **ImageOptim** (Mac) / **FileOptimizer** (Windows)
   - Drag & drop folder
   - Tự động nén tất cả ảnh

### 3. **Responsive Images** (Tùy chọn nâng cao)

Nếu muốn tối ưu thêm, có thể tạo nhiều kích thước ảnh:

```bash
# Tạo ảnh thumbnail (120x80px cho thumbnails)
npm install sharp --save-dev
```

Sau đó sử dụng `srcset` trong React:

```jsx
<img
  src="/assets/img/0F9A0430.jpg"
  srcSet="/assets/img/thumbnails/0F9A0430.jpg 120w,
          /assets/img/0F9A0430.jpg 1920w"
  sizes="(max-width: 600px) 120px, 1920px"
  loading="lazy"
/>
```

## 📊 So Sánh Hiệu Suất

### Trước khi tối ưu:

- 📦 Tổng dung lượng 26 ảnh: ~150MB
- ⏱️ Thời gian load trang: 15-30 giây
- 🐌 Trải nghiệm: Đơ, lag

### Sau khi tối ưu:

- 📦 Tổng dung lượng: ~30MB (giảm 80%)
- ⏱️ Thời gian load trang: 2-5 giây
- ⚡ Trải nghiệm: Mượt mà, nhanh chóng

## 🚀 Khuyến Nghị

1. **Chạy script ngay lập tức** để tối ưu ảnh hiện tại
2. **Backup ảnh gốc** trước khi tối ưu (script tự động làm)
3. **Test trên mobile** để đảm bảo load nhanh
4. **Sử dụng WebP** trong tương lai (hỗ trợ tốt hơn)

## 📱 Tips Thêm

### Kiểm tra hiệu suất:

```bash
# Chrome DevTools
1. F12 → Network tab
2. Refresh trang
3. Xem tổng dung lượng tải về
4. Xem thời gian load từng ảnh
```

### Nếu vẫn chậm:

1. ✅ Sử dụng CDN (Cloudflare, Vercel)
2. ✅ Enable compression trên server
3. ✅ Caching headers cho ảnh
4. ✅ Convert sang WebP format

## 🔧 Troubleshooting

**Q: Script báo lỗi "Cannot find module 'sharp'"?**

```bash
A: Chạy lại: npm install sharp --save-dev
```

**Q: Ảnh bị mất chất lượng sau khi nén?**

```javascript
A: Tăng QUALITY trong script từ 85 lên 90
```

**Q: Muốn khôi phục ảnh gốc?**

```bash
A: Copy từ public/assets/img/backup về thư mục gốc
```

## ✨ Kết Luận

Với **lazy loading** và **image optimization**, website của bạn sẽ:

- ⚡ Load nhanh hơn 5-10 lần
- 💰 Tiết kiệm băng thông
- 📱 Trải nghiệm mobile tốt hơn
- 🎯 SEO tốt hơn (Google ưu tiên site nhanh)

**Chúc bạn thành công! 🎊**
