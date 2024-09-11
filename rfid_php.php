<?php
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $rfid = isset($_GET['rfid']) ? $_GET['rfid'] : '';
    $timeStamp = isset($_GET['time_stamp']) ? $_GET['time_stamp'] : '';

    // Basic validation
    if (empty($rfid) || empty($timeStamp)) {
        echo "Error: Missing parameters.";
        exit();
    }

    // Database credentials
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "rfid_health_db";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO rfid_records (rfid_tag_id, timestamp) VALUES (?, ?)");
    if ($stmt === false) {
        die("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("ss", $rfid, $timeStamp);

    // Execute and check result
    if ($stmt->execute()) {
        echo "Data inserted successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close connections
    $stmt->close();
    $conn->close();
} else {
    echo "Invalid request method.";
}
?>
