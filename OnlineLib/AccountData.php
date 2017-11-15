<?php
	if ($_SERVER["REQUEST_METHOD"] == "GET") {
		$account = (object)$_GET['Log'];
		$b = false;
		$conn = mysqli_connect("localhost", "root", "Pa55w0rd", "save_books");
		if (!$conn) {
			die("Connection failed: " . mysqli_connect_error());
		}
		$sql = "SELECT username, Pass FROM accounts";
		$result = $conn->query($sql);//mysqli_query($conn, $sql);

		if (mysqli_num_rows($result) > 0) {
			// searching for the account in the database
		while($row = $result->fetch_assoc()) {
			if($account->username == $row["username"] && $account->password == $row["Pass"]){
				echo "Access Granted!";
				$b = true;
			}
		}
		} else if(b == false){
			echo "Access Rejected!";
		}

		mysqli_close($conn);
	}
	
	else if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$account = (object)$_POST['Account'];//$_REQUEST("Books");
		$conn = mysqli_connect("localhost", "root", "Pa55w0rd", "save_books");
		if (!$conn) {
			die("Connection failed: " . mysqli_connect_error());
		}
		$sql = "SELECT username FROM accounts";
		$result = $conn->query($sql);
		$isFound = true;
		if(mysqli_num_rows($result) > 0)
		{
			while($row = $result->fetch_assoc()){
				if($account->username == $row["username"])$isFound = false;
			}
			
			if($isFound){
				$sql = "INSERT INTO accounts (username, email, Pass)
					VALUES ('" . $account->username . "', '" . $account->Email . "', '" . $account->password ."')";
				mysqli_query($conn, $sql);
				echo("Access Granted!");
			}
			else echo("Access Rejected!");
		}
		/*$sql = "INSERT INTO Books (Title, Author, Date, ISBN, )
			VALUES ('John', 'Doe', 'john@example.com')";

		if (mysqli_query($conn, $sql)) {
			echo "New record created successfully";
		} else {
			echo "Error: " . $sql . "<br>" . mysqli_error($conn);
		}*/
		
		/*if (mysqli_query($conn, $sql)) {
			echo "New record created successfully";
		} else {
			echo "Error: " . $sql . "<br>" . mysqli_error($conn);
		}*/
		mysqli_close($conn);
		//echo json_encode($account);
	}
?>