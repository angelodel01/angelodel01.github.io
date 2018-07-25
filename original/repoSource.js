


function accessFunction(){
	var input = document.getElementById("Input").value;
	var url = "https://api.github.com/user/repos?access_token=" + input;
	fetch(url).then(function(response){
		return response.json();	
		})
		.then(function(myJson){
			var len = myJson.length;
			var text= ""; 
			for (i = 1; i < len; i++){
				text += myJson[i].name + "<br>";
			}
			document.getElementById("display").innerHTML = text;
		})
}
