// ======================================
// HƯỚNG DẪN SETUP GOOGLE FORM
// ======================================

// BƯỚC 1: Tạo Google Form tại https://forms.google.com
// Tạo 5 câu hỏi với các loại sau:
// 1. Tên của bạn (Short answer)
// 2. Gửi lời nhắn đến cô dâu chú rể (Paragraph) 
// 3. Bạn sẽ đến chứ? (Multiple choice: Có, tôi sẽ tham dự / Rất tiếc, tôi không thể tham dự / Chưa chắc, sẽ thông báo sau)
// 4. Bạn tham dự cùng ai? (Short answer)
// 5. Bạn là khách mời của ai? (Multiple choice: Khách của cô dâu / Khách của chú rể / Khách của cả hai)

// BƯỚC 2: Lấy Form ID
// Từ URL Google Form: https://docs.google.com/forms/d/FORM_ID/edit
// Copy phần FORM_ID

// BƯỚC 3: Lấy Field IDs
// - Mở form ở chế độ preview/test
// - Right-click vào từng input field -> Inspect Element
// - Tìm attribute name="entry.XXXXXXXXX" cho mỗi field
// - Copy các số entry.XXXXXXXXX

// BƯỚC 4: Thay thế các giá trị dưới đây
export const GOOGLE_FORM_CONFIG = {
  // Thay YOUR_GOOGLE_FORM_ID_HERE bằng Form ID thực
  FORM_ID: '1FAIpQLSdSRWOPKjneLPG7tJe1b1nV2fAM-4592PUtEt6mhOoCbOZk7Q',
  
  // Thay các entry.XXXXXXXX bằng Field IDs thực
  FIELD_IDS: {
    name: 'entry.821458673',        // Tên của bạn
    message: 'entry.1651060926',    // Gửi lời nhắn đến cô dâu chú rể  
    willAttend: 'entry.2132574568', // Bạn sẽ đến chứ?
    companions: 'entry.875577643',  // Bạn tham dự cùng ai?
    guestOf: 'entry.1300695398'     // Bạn là khách mời của ai?
  }
};