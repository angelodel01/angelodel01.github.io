/*pw: Bcde@345
*/
var keyUrl = location.hash.substring(1);

///////////////////////////////History popState
window.addEventListener('popState', e => {
	popped_page = e.state.page
	console.log("HERE")
	switch(popped_page.toUpperCase()) {
		case REPO:
		repoClick()
		case STOCK:
		searchClick();
		case PROTECTED:
		protectedClick();
	}
})

///////////////////////////////FUNCTIONS TRIGGERED BY CLICKS

function goHome(idLst){
	wipeWholePage(idLst);
	// window.history.pushState({page : 'home'}, null, '')
	var ogHead = document.getElementById("ogB");
	ogHead.style.display = "block";
}

function repoClick(){
	// window.history.pushState({page : 'repo'}, 'repoPage', './repo')
	createInputBox("Input");
	createButton("List Repos", "accessFunction()", "bn");
	removeHome();
	createButton("Go Home", "goHome(['h', 'bn', 'Input', 'display'])", "h");
	return;
}

function searchClick(){
	// window.history.pushState({page : 'stock'}, 'stockPage', './stock')
	createInputBox("Input");
	createButton("Search Stock", "searchFunction()", "bn");
	removeHome();
	createButton("Go Home", "goHome(['h', 'bn', 'Input', 'display'])", "h");
	return;
}

function protectedClick(){
	// window.history.pushState({page : 'protected'}, 'protectedPage', './protected')
console.log("js var : ", keyUrl);
	protectedContent();
	removeHome();
	window.location.hash = "";
	return;
}

function simpleSearchClick() {
	// window.history.pushState({page : 'simpleSearch'}, 'simpleSearchPage', './simpleSearch')
	createInputBox("searchParam");
	createButton("Search Person", "personSearch()", "bn");
	removeHome();
	createButton("Go Home", "goHome(['h', 'bn', 'searchParam', 'display', 'foundEntries'])", "h");
	return;
}
/////////////////////////////MISCELLANEOUS FUNCTIONS


// make the request to the login endpoint
function getToken() {
	var loginUrl = "https://cognito-dev.calpoly.edu/login?response_type=token&client_id=2fior6770hvto4u6kuq084j7fu&redirect_uri=https://angelodel01.github.io";
	var xhr = new XMLHttpRequest();

	xhr.open('GET', loginUrl, true);
	xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	xhr.addEventListener('load', function() {
		var responseObject = JSON.parse(this.response);
		console.log(responseObject);
		if (responseObject.token) {
			document.cookie = responseObject.token;
		} else {
			console.log("No token received");
		}
	});

	console.log('going to send', sendObject);

	xhr.send();
}

function getCookie(cname) {
	console.log("inside getCookie()");
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function setCookie(cname, cvalue, exsecs) { //not used right now
	var d = new Date();
	//d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	d.setTime(d.getTime() + exsecs*1000)
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}



////////////////////////////////////////FUNCTIONS FOR WIPING PAGE SECTIONS

function removeHome(){
	var ogHead = document.getElementById("ogB");
	ogHead.style.display = "none";
	return;
}

function wipeWholePage(idLst){
	var len = idLst.length;
	var temp;
	var i = 0;
	temp = document.getElementById(idLst[i])
	while (temp != null){
		temp.parentNode.removeChild(temp);
		console.log("rm-idx : ", i);
		console.log("removing ...", idLst[i]);
		i++;
		temp = document.getElementById(idLst[i]);
	}
}



//////////////////////////////FUNCTIONS FOR CREATING ELEMENTS

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
	box.setAttribute("placeholder", "Type here...");
	box.setAttribute("id", id);
	box.setAttribute("class", "textBox");
	document.body.appendChild(box);
}

function createParagraph(id){
	var p = document.createElement("P");
	p.setAttribute("type", "text");
	p.setAttribute("id", id);
	document.body.appendChild(p);
}

function createTable(id){
	var t = document.createElement("TABLE");
	t.setAttribute("type", "text");
	t.setAttribute("id", id);
	document.body.appendChild(t);
}



/////////////////////////////////////////////CONTENT FUNCTIONS

function protectedContent(){
	console.log("inside protectedContent()");
	console.log("id_token : ", id_token);
	// check cookie
	if (keyUrl != ""){
		var realUrl = keyUrl.split("&");
		var id_token = realUrl[0].slice(9);
		console.log("realUrl[2] : ", realUrl[2]);
		var exptime = realUrl[2].slice(11);
		setCookie("id_token", id_token, exptime);
		console.log("expiration time : ", exptime);
		console.log("pulled from cookie : ", key);
	}
	var key = getCookie("id_token");
	if (key == ""){
		window.location = "https://cognito-dev.calpoly.edu/login?response_type=token&client_id=2fior6770hvto4u6kuq084j7fu&redirect_uri=https://angelodel01.github.io";
		return;
	}

	createParagraph("display");
	createTable("table1");
	createButton("Go Home", "goHome(['h', 'display', 'table1'])", "h");

	id_token = key
	document.getElementById("display").innerHTML = "SECRET SECRET SECRET";
	var url = "https://api-dev.calpoly.edu/pets";
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Authorization', 'Bearer ' + id_token);

	//createParagraph("display");
	fetch(url, {headers: headers, mode : "cors",}).then(function(response){
		return response.json();
	})
	.then(function(myJson){
		var len = myJson.length;
		var text= "";
		var table = document.getElementById("table1");
		var row = table.insertRow(0);
		var cell1 = row.insertCell(0);
		cell1.innerHTML = "type :";
		for (i = 0; i < len; i++){
			var cell2 = row.insertCell(i+1);
			cell2.innerHTML = myJson[i].type;
		}
		var row2 = table.insertRow(1);
		var cell3 = row2.insertCell(0);
		cell3.innerHTML = "id :";
		for (i = 0; i < len; i++){
			var cell4 = row2.insertCell(i+1);
			cell4.innerHTML = myJson[i].id;
		}
		var row3 = table.insertRow(2);
		var cell5 = row3.insertCell(0);
		cell5.innerHTML = "price :";
		for (i = 0; i < len; i++){
			var cell6 = row3.insertCell(i+1);
			cell6.innerHTML = myJson[i].price;
		}
	})
	return;
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

function personSearch() {
	var input = document.getElementById("searchParam").value;
	var url = `http://localhost:3000/personSearch?searchParam=${input}`
	url = encodeURI(url)
	fetch(url, {mode:'no-cors'}).then(function(response){
		return response.json()
	}).then(function(myJson){
		let keys = Object.keys(myJson)

		createParagraph("resultMessage")
		createTable("foundEntries")

		let resMsg = document.getElementById("resultMessage")
		let entryTable = document.getElementById("foundEntries")
		let tblHeaderVal = ["Name", "Phone", "Dept", "Username", "Email"]
		if(!keys.length) {
			resMsg.innerHTML = "No entries found"
		} else {
			resMsg.innerHTML = `Found ${keys.length} entries`

			let headerRow = entryTable.createTHead().insertRow(0)
			for(cellVal in tblHeaderVal) {
				headerRow.insertCell().innerHTML = cellVal
			}

			for(key in keys) {
				var entry = myJson[key]
				let entryKeys = Object.keys(entry)
				var row = entryTable.insertRow()

				for(entryKey in entryKeys) {
					row.insertCell().innerHTML = entry[entryKey]
				}
			}

		}
	})
}
