<?php
$host = 'monorail.proxy.rlwy.net';      // ใส่ HOST ที่ได้จาก Railway
$port = '45851';      // ใส่ PORT (ปกติคือ 3306)
$username = 'root';  // ใส่ USER
$password = 'oxqJdFZxXrkIQyPSUjiVFfUXVNnFsDlS'; // ใส่ PASSWORD
$database = 'railway'; // ใส่ชื่อฐานข้อมูล

// สร้างการเชื่อมต่อ
$conn = new mysqli($host, $username, $password, $database, $port);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    die("การเชื่อมต่อล้มเหลว: " . $conn->connect_error);
}

?>
