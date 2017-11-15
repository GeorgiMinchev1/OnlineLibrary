<?php
	if(isset($_FILES["pic"]['name'])){
		/*$input = $_FILE["pic"];
		$output = "myImage.jpg";*/
		$info = pathinfo($_FILES['pic']['name']);
		$ext = $info['extension']; // get the extension of the file
		$newname = "myFile.".$ext; 

		$target = 'images/'.$newname;
		move_uploaded_file( $_FILES['pic']['tmp_name'], $target);
		//file_put_contents($output, file_get_contents($input));
		//echo($input);
	}
?>