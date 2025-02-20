<?php
    include(__DIR__.'/config.php');
    if(isset($_POST["submit"])){
        $UserName = $_POST["username"];
        $Email = $_POST["Email"];
        $phone = $_POST["phone"];
        $Password = $_POST["password"];

        $verify_mysql = mysqli_query($conn, "SELECT * FROM SignUp WHERE email = '$Email'");
        
        if(mysqli_num_rows($verify_mysql) != 0){
            echo"<div>มีข้อมูลเเล้ว</div>
                <a href=''>สร้างใหม่</a>
            ";

        }
        else{
            mysqli_query($conn,"INSERT INTO SignUp(username, email, numbers, passwords) VALUE('$UserName','$Email','$phone','$Password')");
            echo"
                <div>เรียบร้อยเเล้ว</div>
                <a href=''>กลับหน้าเดิม</a>
            ";
        }
    }
?>




<!DOCTYPE html>
<html lang="th">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up</title>
</head>

<body>
    <form action="" method="post">
        <div>
            <div><input type="text" name="username" id="username" placeholder="ชื่อ นามสกุล" required></div>
            <div><input type="email" name="Email" id="email" placeholder="Email"required></div>
            <div><input type="tel" name="phone" placeholder="เบอร์โทรศัพท์" required pattern="^0[689]\d{8}$" maxlength="10"
            title="กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง"></div>
            
            <div style="position: relative; display: inline-block;">
                <input type="password" name="password" id="password" placeholder="รหัสผ่าน" required>
                <button type="button" onclick="togglePassword()"
                    style="position: absolute; top: 50%; transform: translateY(-50%);">
                    <icon id="close" type="button">😸</icon>
                    <icon id="open" style="display: none;" type="button">🐱</icon>
                </button>

            </div>
            <div>
                <input type="submit" name="submit" value="SIGN UP">
            </div>
            <div>
                <button type="button" id="login">Log In</button>
            </div>


            <script>
            function togglePassword() {
                var passwordInput = document.getElementById("password");
                var open = document.getElementById("open");
                var close = document.getElementById("close");
                if (passwordInput.type === "password") {
                    passwordInput.type = "text"; // แสดงรหัสผ่าน
                    open.style.display = "block";
                    close.style.display = "none";
                } else {
                    passwordInput.type = "password"; // ซ่อนรหัสผ่าน
                    open.style.display = "none";
                    close.style.display = "block";
                }
            }
            var login = document.getElementById("login");

            login.addEventListener("click",()=>{
                window.location.href = "Login.php";
            })
            </script>


        </div>

    </form>
</body>

</html>