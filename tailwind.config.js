/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  // GIỮ NGUYÊN: Để đảm bảo Dark Mode hoạt động thủ công (dùng data-theme)
  darkMode: "class", 
  
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      // 🌞 LIGHT THEME (Giữ nguyên cấu hình cũ của bạn)
      {
        light: {
          "color-scheme": "light",
          "base-100": "hsl(220, 15%, 98%)",    
          "base-200": "hsl(220, 10%, 94%)",    
          "base-300": "hsl(220, 10%, 88%)",    
          "base-content": "hsl(220, 15%, 20%)", 

          "primary": "hsl(120, 60%, 35%)",       
          "primary-content": "hsl(0, 0%, 100%)",

          "secondary": "hsl(120, 30%, 65%)",     
          "secondary-content": "hsl(0, 0%, 100%)",

          "accent": "hsl(190, 70%, 45%)",        
          "accent-content": "hsl(0, 0%, 100%)",

          "neutral": "hsl(220, 9%, 40%)",
          "neutral-content": "hsl(0, 0%, 100%)",

          "info": "hsl(210, 90%, 55%)",
          "info-content": "hsl(0, 0%, 100%)",
          "success": "hsl(145, 60%, 40%)",
          "success-content": "hsl(0, 0%, 100%)",
          "warning": "hsl(38, 90%, 50%)",
          "warning-content": "hsl(0, 0%, 15%)", 
          "error": "hsl(0, 75%, 45%)",
          "error-content": "hsl(0, 0%, 100%)",
        },
      },

      // 🌙 DARK THEME (Giữ nguyên BASE-100, Tối ưu hóa phần còn lại)
      {
        dark: {
          "color-scheme": "dark",
          // BẮT BUỘC GIỮ NGUYÊN MÀU CHỦ ĐẠO
          "base-100": "hsl(227, 67%, 14%)",      // MÀU XANH TÍM ĐẬM, ĐỘ BÃO HÒA CAO (Hue 227)
          
          // Base-200 và Base-300 điều chỉnh để nổi bật hơn trên nền Xanh Tím Đậm (227)
          // Tăng độ sáng nhẹ và giữ Hue gần 220 để tránh quá gắt so với base-100
          "base-200": "hsl(220, 15%, 25%)",      // Khối nổi nhẹ (Sáng hơn base-100)
          "base-300": "hsl(220, 12%, 35%)",      // Nền phụ (Sáng hơn base-200)
          "base-content": "hsl(0, 0%, 85%)",     // Text sáng 

          // Primary (Xanh lá) - Giữ Hue 120, tăng độ tương phản với nền 227
          "primary": "hsl(120, 75%, 50%)",       // Tăng nhẹ Saturation và Lightness để nổi bật
          "primary-content": "hsl(0, 0%, 100%)",

          // Secondary (Xanh lá nhạt hơn)
          "secondary": "hsl(120, 30%, 60%)",
          "secondary-content": "hsl(0, 0%, 100%)",

          // Accent (Ngọc lam) - Tăng Lightness để làm điểm nhấn tốt hơn
          "accent": "hsl(190, 70%, 65%)",        // Tăng độ sáng cho nổi bật
          "accent-content": "hsl(0, 0%, 100%)",

          // Neutral 
          "neutral": "hsl(220, 10%, 75%)",       // Màu xám sáng cho các thành phần trung tính
          "neutral-content": "hsl(227, 67%, 14%)",// Text màu nền chính (base-100)

          // Màu hệ thống: Tăng độ sáng để chúng dễ đọc trên nền tối, nhưng vẫn dùng text tối
          "info": "hsl(210, 90%, 70%)",          
          "success": "hsl(145, 60%, 55%)",       
          "warning": "hsl(38, 90%, 65%)",        
          "error": "hsl(0, 70%, 60%)",           
          
          // Content của các màu hệ thống là màu nền chính (base-100)
          "info-content": "hsl(227, 67%, 14%)",
          "success-content": "hsl(227, 67%, 14%)",
          "warning-content": "hsl(227, 67%, 14%)",
          "error-content": "hsl(227, 67%, 14%)",
        },
      },
    ],
  },
};