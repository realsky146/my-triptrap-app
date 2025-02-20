<?php

$host = 'localhost';
$port = 3306;
$dbname = 'triptrap';
$username = 'pictourny';
$password = '1234';

// Create a mysqli connection
$conn = new mysqli($host, $username, $password, $dbname, $port);

// Check connection
if ($conn->connect_error) {
    die('Connection failed: ' . $mysqli->connect_error);
};




?>
