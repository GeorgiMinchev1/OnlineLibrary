$(document).ready(function(){
	//array of objects
	var Books = [];
	//var Favourites = [];
	var jsonData;
	
	$.ajax({
			url: "/OnlineLib/test.php", //C:\\Users\\Gogo\\Desktop\\CurrProj\\;
			type: "GET", //default anyway, provided for clarity
			success: function(data){
			Books = JSON.parse(data);
			sortBooksByName();
			printBooksInteligently();
				$(".readButton").click(function(){
						$(this.nextSibling).css("display", "block");
						this.innerHTML = "Ready"
						$(this).click(function(){$(this).parent().remove();});
					//взимане на индекса на елемента от масива
					//var idOfEl = $(this).parent().id;
					/*this.previousSibling.style.display = 'none';
					this.style.display = 'none';*/
						
					//idOfEl = parseInt(idOfEl);
					
				});
				var str = "";
				$("#searchBut").click(function(){
						    $( "select option:selected" ).each(function() {
								str = $( this ).text();
							});
						Search(str);
				});
				$("select").change(function(){
						    $( "select option:selected" ).each(function() {
								str = $( this ).text();
							});
						Search(str);
				});
				
				document.addEventListener('keypress', function (e) {
					var key = e.which || e.keyCode;
					if (key === 13) { // 13 is enter
					// code for enter
						$( "select option:selected" ).each(function() {
								str = $( this ).text();
							});
						Search(str);
					}
				});
				
			}
			// , 
			// error: function (jqXHR, exception) {
        // var msg = '';
        // if (jqXHR.status === 0) {
            // msg = 'Not connect.\n Verify Network.';
        // } else if (jqXHR.status == 404) {
            // msg = 'Requested page not found. [404]';
        // } else if (jqXHR.status == 500) {
            // msg = 'Internal Server Error [500].';
        // } else if (exception === 'parsererror') {
            // msg = 'Requested JSON parse failed.';
        // } else if (exception === 'timeout') {
            // msg = 'Time out error.';
        // } else if (exception === 'abort') {
            // msg = 'Ajax request aborted.';
        // } else {
            // msg = 'Uncaught Error.\n' + jqXHR.responseText;
        // }
        // alert(msg);
    // },
				
	});
	// console.log(localStorage.getItem('books'));
	// var Books = [];
	// $("#searchButton").click(function(){
		// var sth = localStorage.getItem('books');
		// Books = JSON.parse(sth);//Use -> $.parseJSON
		
	// });
	//сортиране на книгите по заглавие
	function sortBooksByName(){
		var namesOfBooks = [];
		for(var i = 0;i<Books.length;i++){
			namesOfBooks[i] = Books[i].title;
		}
		var changer;
		namesOfBooks.sort();
		
		for(var numberOfBook in namesOfBooks){
			for(var i = 0;i<Books.length;i++){
				if(namesOfBooks[numberOfBook] === Books[i].title)
				{
					changer = Books[i];
					Books[i] = Books[numberOfBook];
					Books[numberOfBook] = changer;
					
				}
			}
		}
		numberOfBook = null;
		namesOfBooks = null;
		changer = null;
	}
	
	//извеждане
	function printBooksInteligently(obj){
		for(var i = 0;i < Books.length;i++)$("#resultBox").append("<div class=\"bookBox\" id=\"" + i +"\">");
		for(var i = 0;i < Books.length;i++){
			var but = document.createElement("BUTTON");
			var t = document.createTextNode("Прочети");
			but.appendChild(t);
			//but.setAttribute("id", i);
			but.setAttribute("class", "readButton");
			//but.setAttribute("onclick", console.log("ok"));
			$("#" + i).append(
			"<img class=\"imgOfBook\" src=\"mysterybook.gif\"><br/><p class=\"resultP\">Име: " + Books[i].title + 
			"<br/>Автор: " + Books[i].author + 
			"<br/>Дата на издаване: " + Books[i].date +
			"<br/>ISBN: " + Books[i].ISBN + "</p><br/>");//<button class=\"FavBut\">Add to Favourites</button><br/>
			$("#" + i).append(but);
			$("#" + i).append("<div style=\"display:none;\"><p>" 
			+ Books[i].Description + "</p></div>");
			//document.getElementById("resultBox").appendChild(but);
		}
	}
	//премахване на елемента от масива когато се натисне бутона Прочети
	
	function removeBookFromPage(n, i){
		//$("#" + n).prev().hide("slow");
		$("#" + n).hide("fast");
	}
	function showBookOnPage(n){
		//$("#" + n).prev().show("slow");
		$("#" + n).show("fast");
	}
	
	
	function Search(searchBy){
		var check = $("#searchBox").val();
			var isForPrinting = true;
			switch(searchBy){
				case "Title" : {
					for(var i = 0;i < Books.length;i++)
					{
					if(Books[i].title.indexOf(check) === -1)removeBookFromPage(i, Books[i].title.indexOf(check));
					else showBookOnPage(i);
					}
				}
					break;
				
				case "Author" : {
					for(var i = 0;i < Books.length;i++)
					{
					if(Books[i].author.indexOf(check) === -1)removeBookFromPage(i, Books[i].title.indexOf(check));
					else showBookOnPage(i);
					}
					}
					break;
				
				case "ISBN" : {
					for(var i = 0;i < Books.length;i++)
					{
					if(Books[i].ISBN.indexOf(check) === -1)removeBookFromPage(i, Books[i].title.indexOf(check));
					else showBookOnPage(i);
					}
				}
					break;
		
		}
	}
	
	/*
	//searchBookBy('name')searchBookBy('author')searchBookBy('ISBN')
	$("#textName").change(function(){
		for(var i = 0;i < Books.length;i++)
		{
			
			if(Books[i].title.indexOf($("#textName").val()) != -1){
				isForPrinting = true;
				showBookOnPage(i);
			}
		else removeBookFromPage(i);
		}});
	$("#textAuthor").change(function(){
		for(var i = 0;i < Books.length;i++)
		{
			var isForPrinting = true;
			if(Books[i].author.indexOf($("#textAuthor").val()) != -1) 
			{	
				isForPrinting = true;
				showBookOnPage(i);
			}
		else removeBookFromPage(i);
		}});
	$("#textISBN").change(function(){
		for(var i = 0;i < Books.length;i++)
		{
			var isForPrinting = true;
			if(Books[i].ISBN.indexOf($("#textISBN").val()) != -1) 
			{	
				isForPrinting = true;
				showBookOnPage(i);
			}
		else removeBookFromPage(i);
	}});*/
});