$(document).ready(function(){
	if(localStorage.getItem("UserName") !== null)
	{
		
		var username = localStorage.getItem("UserName");
		var pasword = localStorage.getItem("Password");
		//LogInAccount(username, pasword);
		document.getElementById("regLink").innerHTML = "Log Out";
		document.getElementById("regLink").setAttribute("href", "#");
		var obj = document.getElementById("logLink");
		var msg = "Logged in as " + username;
		$(obj).css("pointer-events", "none");
		obj.innerHTML = msg;
		$("#regLink").click(function(){
			LogOut();
		});
	}
	function Login(){
		if(localStorage.getItem("UserName") === null){
			var username = document.getElementById("username").value;
			var pasword = document.getElementById("Password").value;
			LogInAccount(username, pasword);
			
	}
	}
	function Register(){
		var username = document.getElementById("username").value;
		
		//Username check in the database.!!
		var Email = document.getElementById("Email").value;
		
		//the same check as username
		var pasword = document.getElementById("Password").value;
		
		if(pasword != document.getElementById("RepPass").value){
			alert("The repeat password content should be identical to the password");
			document.getElementById("Password").value = "";
			document.getElementById("RepPass").value = "";
		}
		else {
			SignUpAccount(username, Email, pasword);
		}
		//window.location = "index.html";
	}
	document.querySelector('#Password').addEventListener('keypress', function (e) {
		var key = e.which || e.keyCode;
		if (key === 13) { // 13 is enter
		// code for enter
			Login();
		}
	});
	
	$("#logButton").click(function(){
		console.log("Button");
		Login();
	});
	
	document.querySelector('#RepPass').addEventListener('keypress', function (e) {
		var key = e.which || e.keyCode;
		if (key === 13) { // 13 is enter
		// code for enter
			Register();
		}
	});
	$("#regButton").click(function(){
		console.log("You are about to make an account");
		Register();
	});
	
	function LogInAccount(userName, Pass)
	{	
		var log = {username: userName, password: Pass}
		//ajax zaqvka za checkvane v bazata danni
		$.ajax({
			url: "/OnlineLib/AccountData.php", //C:\\Users\\Gogo\\Desktop\\CurrProj\\;
			type: "GET", //default anyway, provided for clarity
			data:	{	"Log" : log	},
			success: function (data){
				if(data === "Access Granted!")
				{
					console.log("Access Granted!");
					var b = confirm("Do you want to stay singed in ?");
					if (b){
						localStorage.setItem("UserName", userName.toString());
						localStorage.setItem("Password", Pass.toString());
					}
				window.location = "index.html";
				}
				
				else {
					console.log("Access Rejected!");
					alert("Your password is wrong!")
				}
				// iskame da si napravi drug account ili da probva da vleze pak da smeni parolata .....
			}, 
			error: function (jqXHR, exception) {
			var msg = '';
			if (jqXHR.status === 0) {
				msg = 'Not connect.\n Verify Network.';
			} else if (jqXHR.status == 404) {
				msg = 'Requested page not found. [404]';
			} else if (jqXHR.status == 500) {
				msg = 'Internal Server Error [500].';
			} else if (exception === 'parsererror') {
				msg = 'Requested JSON parse failed.';
			} else if (exception === 'timeout') {
				msg = 'Time out error.';
			} else if (exception === 'abort') {
				msg = 'Ajax request aborted.';
			} else {
				msg = 'Uncaught Error.\n' + jqXHR.responseText;
			}
			alert(msg);
			}
				
		});
		
		
	}
	
	function LogOut(){
		if(localStorage.getItem("UserName") !== null)
		{
			localStorage.removeItem("UserName");
			localStorage.removeItem("Password");
			location.reload();
		}
	}
	
	function SignUpAccount(userName, email, Pass)
	{
		var account = {username: userName, Email: email, password: Pass}
		//ajax zaqvka za pisane v bazata danni
		$.ajax({
			url: "/OnlineLib/AccountData.php", //C:\\Users\\Gogo\\Desktop\\CurrProj\\;
			type: "POST", //default anyway, provided for clarity
			//dataType: "json", //the returned data from the server will be automatically parsed as json
			data: {	"Account": account	}, //the KO model we converted earlier
			success: function(data){
				if(data === "Access Granted!"){
					alert("Congratulations, you successfully made your account.");
				}
				else{
					alert("There is another account with the same name please try with another one.");
				}
				console.log(data.toString());
			}
		});
	}
})