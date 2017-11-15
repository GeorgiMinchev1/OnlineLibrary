<?php
	class Book{
		public $title;
		public $author;
		public $date;
		public $ISBN;
		public $Description;
	}
	if ($_SERVER["REQUEST_METHOD"] == "GET") {
		$books = array();
		
		$conn = mysqli_connect("localhost", "root", "Pa55w0rd", "save_books");
		if (!$conn) {
			die("Connection failed: " . mysqli_connect_error());
		}
		$sql = "SELECT Title, Author, Date, ISBN, Description FROM books";
		$result = $conn->query($sql);//mysqli_query($conn, $sql);

		if (mysqli_num_rows($result) > 0) {
			// output data of each row
		while($row = $result->fetch_assoc()) {
			$B = new Book();
			$B->title = $row["Title"];
			$B->author = $row["Author"];
			$B->date =  $row["Date"];
			$B->ISBN = $row["ISBN"];
			$B->Description = $row["Description"];
			array_push($books, $B);
		}
		} else {
			echo "0 results";
		}

		mysqli_close($conn);
		echo json_encode($books);
	}
	//sending the array from the file or the database sorted or not
	else if ($_SERVER["REQUEST_METHOD"] == "POST") {
		/*$conn = mysql_connect("localhost", "root", "Pa55w0rd", "save_books");
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		} 
		$sql = "CREATE TABLE BookData();";
		if ($conn->query($sql) === TRUE) {
			echo "Database created successfully";
		} else {
			echo "Error creating database: " . $conn->error;
		}
		
		$conn->close();
		*/
		$book = (object)$_POST['Books'];//$_REQUEST("Books");
		$conn = mysqli_connect("localhost", "root", "Pa55w0rd", "save_books");
		if (!$conn) {
			die("Connection failed: " . mysqli_connect_error());
		}
		/*$sql = "INSERT INTO Books (Title, Author, Date, ISBN, )
			VALUES ('John', 'Doe', 'john@example.com')";

		if (mysqli_query($conn, $sql)) {
			echo "New record created successfully";
		} else {
			echo "Error: " . $sql . "<br>" . mysqli_error($conn);
		}*/
		$sql = "INSERT INTO books (Title, Author, Date, ISBN, Description)
			VALUES ('" . $book->title . "', '" . $book->author . "', STR_TO_DATE('" . $book->date ."', '%Y-%m-%d'), '". $book->ISBN . "', '". $book->description ."')";
		if (mysqli_query($conn, $sql)) {
			echo "New record created successfully";
		} else {
			echo "Error: " . $sql . "<br>" . mysqli_error($conn);
		}
		mysqli_close($conn);
		//$array = json_decode(file_get_contents('array.json'));
		//$sth = file_put_contents("/array.json", "Hello! ");
		//$arr2 = json_decode(file_get_contents('/array.json'), true);
		//file_put_contents('array.json', json_encode($books));
		//$array = unserialize(file_get_contents('array.json'));
		//echo $books . "" . json_encode($array);
	}
?>