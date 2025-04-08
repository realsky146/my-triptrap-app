<?php

header("Access-Control-Allow-Origin: *");  // อนุญาตทุกที่มาที่เข้าถึง API
header("Access-Control-Allow-Methods: POST");  // อนุญาตให้ใช้ POST
header("Access-Control-Allow-Headers: Content-Type");  // อนุญาตให้ส่ง Content-Type เป็น JSON

include(__DIR__ . ("/config.php"));

// รับข้อมูลจาก React (JSON)
$data = json_decode(file_get_contents("php://input"));
$email = $data->email ?? '';
$password = $data->password ?? '';

if (empty($email) || empty($password)) {
    echo json_encode(["message" => "กรุณากรอกข้อมูลให้ครบ"]);
    http_response_code(400);
    exit;
}

// เช็คข้อมูลในฐานข้อมูล
$check_email_mysqli = mysqli_query($conn, "SELECT * FROM SignUp WHERE email = '$email'");

if (mysqli_num_rows($check_email_mysqli) != 0) {
    // ตรวจสอบรหัสผ่าน
    $check_password_mysqli = mysqli_query($conn, "SELECT * FROM SignUp WHERE email = '$email' AND passwords = '$password'");

    if (mysqli_num_rows($check_password_mysqli) != 0) {
        echo json_encode(["message" => "Login สำเร็จ"]);
        http_response_code(200); // HTTP 200 OK
    } else {
        echo json_encode(["message" => "รหัสผ่านไม่ถูกต้อง"]);
        http_response_code(400); // HTTP 400 Bad Request
    }
} else {
    echo json_encode(["message" => "ไม่มีบัญชีผู้ใช้นี้"]);
    http_response_code(404); // HTTP 404 Not Found
}
