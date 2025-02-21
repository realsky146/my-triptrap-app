<?php

$token = $_POST['token'];

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

/*if ($user === null) {
    echo "Token not found";
}

if (strtotime($user["reset_token_expires_at"]) <= time()) {
    echo "Token has expired";
}*/
// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validate form data
    $users_Password = $_POST['new-password'];
    $confirm_Password = $_POST['new-confirm_password'];

    // Check if passwords match
    if ($users_Password !== $confirm_Password) {
        echo "<!DOCTYPE html>
        <html>
        <head>
        <link rel='stylesheet' href='./style.css'>
            <title>Reset Password</title>
        </head>
        <body>
        <div class='background'>
                <div class='container'>
                    <div class='box form-box'>
            <form method='post' action=''>
            <div class='message'>
            <p>Passwords do not match. Please try again.</p>
                            </div> <br>
       ";

    } else {
        // Hash the new password
        $hashed_password = password_hash($users_Password, PASSWORD_DEFAULT);

        // Get the user's email from the session or any other source
        $email = $user['email']; // Assuming the email is retrieved from the database

        // Prepare and execute the SQL UPDATE query
        $sql = "UPDATE SignUp SET passwords = ? WHERE email = ?";
        $stmt = $conn->prepare($sql);

        if ($stmt) {
            $stmt->bind_param('ss', $users_Password, $email);
            $stmt->execute();

            // Check if the password was successfully updated
            if ($stmt->affected_rows > 0) {
                echo "<!DOCTYPE html>
                <html>
                <head>
                <link rel='stylesheet' href='./style.css'>
                    <title>Reset Password</title>
                </head>
                <body>
                <div class='background'>
                        <div class='container'>
                            <div class='box form-box'>
                    <form method='post' action=''>
                    <div class='message'>
                    <p>Password reset successfully!</p>
                </div> <br>
               ";
            } else {
                echo "<p>Failed to reset password. Please try again.</p>";
            }
        } else {
            echo "<p>Failed to prepare statement: " . $conn->error . "</p>";
        }

        // Close the statement
        $stmt->close();
    }
}
?>
