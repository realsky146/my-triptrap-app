// types/userTypes.ts
export interface UserProfile {
  fullName: string;
  email: string;
  username: string;
  profileImage: string;
  phone?: string;  // เบอร์โทรศัพท์ (Optional)
  password?: string;  // รหัสผ่าน (Optional)
  confirmPassword?: string;  // คอนเฟิร์มรหัสผ่าน (Optional)
}
