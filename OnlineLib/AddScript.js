$(document).ready(function(){
	books = [];
	
	$("#addButton").click(function(){
		//book = {title: ko.observable(""), author: ko.observable(""), genre: ko.observable(""), ISBN: ko.observable(""), date: ko.observable("")};
		//ko.applyBindings(book);
		//console.log(book);
		//books = JSON.parse(sth);//Use -> $.parseJSON
		var name = document.getElementById("title").value;
		var author = document.getElementById("author").value;
		var date = document.getElementById("date").value;
		var ISBN = document.getElementById("ISBN").value;
		//document.getElementById("cover").accept = "image/*";//document.createElement("IMG");
		//var img = document.createElement("IMG");
		//var Cover = document.getElementById("cover");
		//img.src = Cover.value;
		
		
		//console.log(document.getElementById("cover").value);
		var description = document.getElementById("description").value;
		//object
		//document.getElementById("Trial").appendChild(img);
		var book = {
			title: name,
			author: author,
			date: date,
			ISBN: ISBN,
			description: description
		}
		//pushing items in array
		books.push(book);
		var jsonData = JSON.stringify(books);
		//alert(jsonData);
		$.ajax({
			url: "/OnlineLib/test.php", //C:\\Users\\Gogo\\Desktop\\CurrProj\\;
			type: "POST", //default anyway, provided for clarity
			//dataType: "json", //the returned data from the server will be automatically parsed as json
			data: {	"Books": book	}, //the KO model we converted earlier
			success: function(data){
			console.log("The Array has been send to the database. ");
			console.log(data.toString());
			}
		});
		//$.get("https://localhost/test.php", success:function(data, success){alert("Data: ", data);});//, data: jsonData, dataType: "json";
		//alert(JSON.stringify(book));
	    //packing an unstored item
		//localStorage.setItem('books', JSON.stringify(books));
	});
});