<?php
include 'db.php';

$action = $_POST['action'];

switch ($action) {
    case 'create':
        $name = $_POST['name'];
        $description = $_POST['description'];
        $sql = "INSERT INTO items (name, description) VALUES ('$name', '$description')";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["success" => true, "id" => $conn->insert_id]);
        } else {
            echo json_encode(["success" => false, "error" => $conn->error]);
        }
        break;
    case 'read':
        $sql = "SELECT * FROM items";
        $result = $conn->query($sql);
        $items = [];
        while($row = $result->fetch_assoc()) {
            $items[] = $row;
           // print_r($items);
           
        }
        echo json_encode($items);
        break;
    case 'update':
        $id = $_POST['id'];
        $name = $_POST['name'];
        $description = $_POST['description'];
        $sql = "UPDATE items SET name='$name', description='$description' WHERE id=$id";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "error" => $conn->error]);
        }
        break;
    case 'delete':
        $id = $_POST['id'];
        $sql = "DELETE FROM items WHERE id=$id";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "error" => $conn->error]);
        }
        break;
}

$conn->close();
?>
