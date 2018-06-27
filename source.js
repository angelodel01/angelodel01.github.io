var par = 0;

function repoClick(){
	par = 0;
	createInputBox("Input");
	createButton("List Repos", "accessFunction()", "bn");
	removeTitle();
	createButton("Go Home", "goHome()", "h");
	return;
}

function searchClick(){
	par = 0;
	createInputBox("Input");
	createButton("Search Stock", "searchFunction()", "bn");
	removeTitle();
	createButton("Go Home", "goHome()", "h");
	return;
}


function removeTitle(){
	var ogHead = document.getElementById("ogB");
	ogHead.style.display = "none";
	return;
}

function wipeChildPage(){
	var rbtn, hbtn, field, div;
	hbtn = document.getElementById("h");
	hbtn.parentNode.removeChild(hbtn);

	rbtn = document.getElementById("bn");
	rbtn.parentNode.removeChild(rbtn);

	field = document.getElementById("Input");
	field.parentNode.removeChild(field);
	if (par == 1){
		div = document.getElementById("display");
		div.parentNode.removeChild(div);
	}
}

function goHome(){
	wipeChildPage();
	var ogHead = document.getElementById("ogB");
	ogHead.style.display = "block";
}

function createButton(message, func, id){
	var mess;
	var btn;
	btn = document.createElement("BUTTON");
	mess = document.createTextNode(message);
	btn.appendChild(mess);
	btn.setAttribute("id", id);
	btn.setAttribute("onClick", func);
	btn.setAttribute("class", "button");
	document.body.appendChild(btn);
}


function createInputBox(id){
	var box = document.createElement("INPUT");
	box.setAttribute("type", "text");
	box.setAttribute("placeholder", "type here...");
	box.setAttribute("id", id);
	box.setAttribute("class", "textBox");
	document.body.appendChild(box);
}

function createParagraph(id){
	par = 1;
	var p = document.createElement("P");
	p.setAttribute("type", "text");
	p.setAttribute("id", id);
	document.body.appendChild(p);
}



function accessFunction(){
	var input = document.getElementById("Input").value;
	var url = "https://api.github.com/user/repos?access_token=" + input;
	createParagraph("display");
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


function searchFunction(){
	var input = document.getElementById("Input").value;
	var request = new XMLHttpRequest();
	createParagraph("display");
	request.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var resp = this.response;
    		document.getElementById("display").innerHTML = "<b>Symbol : </b>" + resp.symbol +
    		"<br />" + "<b>Company Name :</b> " + resp.companyName +
    		"<br />" + "<b>Exchange :</b> " + resp.exchange +
    		"<br />" + "<b>Industry :</b> " + resp.industry +
    		"<br />" + "<b>Website :</b> " + resp.website +
    		"<br />" + "<b>Description :</b> " + resp.description + 
    		"<br />" + "<b>CEO :</b> " + resp.CEO +
    		"<br />" + "<b>Issue Type</b> : " + resp.issueType +
    		"<br />" + "<b>Sector :</b> " + resp.sector + 
    		"<br />" + "<b>Tags :</b> " + resp.tags;
		}
	};
	request.open("GET", `https://api.iextrading.com/1.0/stock/${input}/company`, true);
	request.responseType ='json';
	request.send();
}


