<?php

include(__DIR__.("/config.php"));

    if(isset($_POST['submit'])){
        $email = $_POST['Email'];
        $password = $_POST['password'];
        $check_email_mysqli = mysqli_query($conn,"SELECT * FROM SignUp WHERE email = '$email'");
       

        if(mysqli_num_rows($check_email_mysqli) != 0){
            $check_password_mysqli = mysqli_query($conn,"SELECT * FROM SignUp WHERE passwords = '$password'");
            if(mysqli_num_rows( $check_password_mysqli) != 0){
                echo"<div>
                    login เรียบร้อยเหมี๊ยว
                </div>";
            }
            else{
                echo"<div>รหัสผ่านยังไม่ถูกนะเหมี๊ยว</div>";
            }
        }else{
            echo"<div>
            เหมือนจะยังไม่มีบัญชีนะเหมียว
        </div>";
        }
    }


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LogIn</title>
</head>
<body>
    <form action="" method="post">
        <div>
            <div>
                <input type="email" name="Email" id="email" placeholder="Email" required>
            </div>
            <div style="position: relative; display: inline-block;">
                <input type="password" name="password" id="password" placeholder="รหัสผ่าน" required>
                <button type="button" onclick="togglePassword()"
                    style="position: absolute; top: 50%; transform: translateY(-50%);">
                    <icon id="close" type="button">😸</icon>
                    <icon id="open" style="display: none;" type="button">🐱</icon>
                </button>

            </div>
            <div>
                <input type="submit" name="submit" value="Login">
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
            </script>
        </div>
    </form>
</body>
</html>