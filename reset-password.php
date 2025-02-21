<?php

if (!isset($_GET['token'])) {
    die("Token parameter is missing.");
}

$token = $_GET['token'];
$token_hash = hash("sha256", $token);

require_once('config.php');

$sql = "SELECT * FROM SignUp WHERE reset_token_hash = ?";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    die("Failed to prepare statement: " . $conn->error);
}

$stmt->bind_param('s', $token_hash);

$stmt->execute();

$result = $stmt->get_result();
if (!$result) {
    die("Error executing query: " . $stmt->error);
}

$user = $result->fetch_assoc();

if ($user === null) {
    die("Token not found");
}

if (strtotime($user["reset_token_expires_at"]) <= time()) {
    echo "
            <!DOCTYPE html>
        <html>
        <head>
        <link rel='stylesheet' href='./style.css'>
            <title>Reset Password</title>
        </head>
        <body>

        <div class='background'>
                <div class='container'>
                    <div class='box form-box'>
            <form method='post' action='./process_reset_password.php'>
            <!-- Include a hidden input field to send the token value -->
            <input type='hidden' name='token' value='$token'>
            <div class='field input'>
            <label for='password'>New Password</label>
            <input type='password' name='new-password' id='Password' required><br><br>
            </div>

            <div class='field input'>
            <label for='confirm_password'>Confirm Password</label>
            <input type='password'name='new-confirm_password' id='Password' required><br><br>
            </div>

            <input type='submit' class='new-btn' value='Reset Password'>
        </form>
    </div>
</div>
</div>
</body>
</html>
";
}
?>
