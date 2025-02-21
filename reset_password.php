<!-- reset_password.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>forgot password</title>
</head>
<body>
<div class="background">
        <div class="container">
            <div class="box form-box">
    
<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once('config.php');
require_once('./phpmailer/vendor/autoload.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];

    // Check if the email exists in the database
    $query = "SELECT * FROM SignUp WHERE email = '$email'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) == 1) {
        // Generate a random password reset token
        $token = bin2hex(random_bytes(32));

        // Update the user's record in the database with the token and expiration time
        $expires_at = date('Y-m-d H:i:s'); // Token expiration time (1 hour from now)
        $token_hash = hash("sha256", $token);
        $update_query = "UPDATE SignUp SET reset_token_hash = '$token_hash', reset_token_expires_at = '$expires_at' WHERE email = '$email'";
        mysqli_query($conn, $update_query);

        if(mysqli_affected_rows($conn) > 0) {
            $mail = new PHPMailer(true);
            
            // Configure PHPMailer
            $mail->isSMTP();
            $mail->SMTPAuth = true;
            $mail->Host = "smtp.gmail.com";
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;
            $mail->Username = "pinmanee.invest@gmail.com";
            $mail->Password = "eeznkvebtmlfifbu";
            $mail->isHTML(true);

            $mail->setFrom("pinmanee.invest@gmail.com","TripTrap");
            $mail->addAddress($email);
            $mail->Subject = "Password Reset";
            $mail->Body = "Click <a href='http://localhost:3000/reset-password.php?token=$token'>here</a> to reset your password.";

            try {
                $mail->send();
                echo "<div class='message'>
                <p>Message sent, please check your inbox</p>
            </div><br>
            ";
            echo "<a href='login.php'><button class='btn-back'>back</button></a>";
            } catch (Exception $e) {
                echo "Message could not be sent. Mailer error: {$mail->ErrorInfo}";
            }
        } else {
            echo "Failed to update reset token.";
        }
    } else {
        echo "<div class='message'>
        <p>No user found with that email address.</p>
    </div><br>";
    }
}else{
?>


                <header id="forgot-password"> FORGOT PASSWORD</header>
                    <img src="./Rectangle 31.png" id="logo">
                
                <form action="./reset_password.php" method="post">
                    <div class="field input">
                        <label for="Email">Email</label>
                        <input type="email" name="email" id="Email" required>

                    </div>
                
                    <div class="field">
                        
                        <input type="submit" name="submit" class="btn" value="sent" required>
                
                    </div>
                </form>
                <?php } ?>
            </div>
        </div>
    </div>
   
</body>
</html>
    
