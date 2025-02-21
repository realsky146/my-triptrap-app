import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './profile.module.css'; // นำเข้า CSS Module
import { mockUserData } from "../../data/mockUserData"; // นำเข้าข้อมูลที่แยกออกมา
import "../style/App.css"; // นำเข้า App.css เพียงครั้งเดียว
import wal from "../../assets/pic/วอลเปเปอร์.png"; // ปรับให้ตรงกับตำแหน่งที่ไฟล์ของคุณอยู่


const Profile: React.FC = () => {
  const [user, setUser] = useState(mockUserData); // ใช้ข้อมูลที่นำเข้ามา
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null); // เก็บข้อมูลรูปภาพ
  // ฟังก์ชันสำหรับการอัปโหลดรูป
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // ดึงไฟล์รูปภาพ
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // เก็บรูปที่อัปโหลด
      };
      reader.readAsDataURL(file); // อ่านไฟล์เป็น URL
    }
  };
  const handleLogout = () => {
    navigate("/"); // ไปยังหน้าแรก หรือหน้า Login
  };

  return (
    <div className={styles.profileContainer}>
      <div className={`${styles.background}`} style={{ backgroundImage: `url(${wal})` }}>
        {/* เนื้อหาของโปรไฟล์ */}
      </div>
      <div className={styles.profileHeader}>
        <h1>Profile...</h1>
      </div>
      <div className={styles.profileContent}>
        <div className={styles.profilePicture}>
        <label htmlFor="fileInput" className={styles.profileImgLabel}>
          <img
            src={image || "https://via.placeholder.com/150"} // ใช้รูปที่อัปโหลดหรือรูปเดิม
            alt="Profile"
            className={styles.profileImg}
          />
        </label>

        {/* input ถูกซ่อน */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          id="fileInput"
          className={styles.fileInput}
        />
          {/* <button className="uploadBtn">Upload</button> */}
        </div>
       
        <div className={styles.profileDetails}>

          <form className="formGroup">
          <div className={styles.formGroup}>
              <label htmlFor="fullName">ชื่อ-นามสกุล...</label>
              <input type="text" id="fullName" placeholder="ชื่อ-นามสกุล" defaultValue={user.fullName} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="username">Username...</label>
              <input type="text" id="username" placeholder="ยูเซอร์เนม" defaultValue={user.username} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">E-mail...</label>
              <input type="email" id="email" placeholder="อีเมลล์" defaultValue={user.email} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone...</label>
              <input type="text" id="phone" placeholder="เบอร์โทรศัพท์" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password...</label>
              <input type="password" id="password" placeholder="รหัสผ่าน" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm Password...</label>
              <input type="password" id="confirmPassword" placeholder="คอนเฟิร์มรหัสผ่าน" />
            </div>
            <button className={styles.saveBtn}>Save Changes</button>
          </form>
          <button className={styles.editProfileBtn}>Edit Profile</button>
          <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
