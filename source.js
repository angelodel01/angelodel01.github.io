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
	createButton("Go Home", "goHome(['h', 'bn', 'Input', 'gitRepos'])", "h");
	return;
}

function searchClick(){
	// window.history.pushState({page : 'stock'}, 'stockPage', './stock')
	createInputBox("Input");
	createButton("Search Stock", "searchFunction()", "bn");
	removeHome();
	createButton("Go Home", "goHome(['h', 'bn', 'Input', 'stockTable'])", "h");
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
	createButton("Go Home", "goHome(['h', 'bn', 'searchParam', 'foundEntries', 'resultMessage'])", "h");
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
	err = document.getElementById("errorMess")
	if (err != null){
		err.parentNode.removeChild(err)
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

function createDiv(id, clas){
	var d = document.createElement("DIV");
	d.setAttribute("id", id);
	d.setAttribute("class", clas);
	document.body.appendChild(d);
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
	createTable("petsTable");
	createButton("Go Home", "goHome(['h', 'display', 'petsTable'])", "h");

	id_token = key
	document.getElementById("display").innerHTML = "<h2>PROTECTED CONTENT ACCESS GRANTED</h2><br><h4> You can now view and buy pets</h4>";

	let dispTblPet = document.getElementById("petsTable");
	var url = "https://api-dev.calpoly.edu/pets";
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Authorization', `Bearer ${id_token}`);

	fetch(url, {headers: headers, mode : "cors"}).then(function(response){
		return response.json();
	})
	.then(function(petsJson){

		var keys = Object.keys(petsJson);
		var petKeys = Object.keys(petsJson[0]);
		for(key in keys) {
			var petJson = petsJson[key]

			var row = dispTblPet.insertRow();
			row.className = "tBodyRow"
			for(petKey in petKeys) {
				var keyName = petKeys[petKey]
				row.insertCell().innerHTML = petJson[keyName]
			}
		}

		row = dispTblPet.createTHead().insertRow(0);
		row.className = "thRow"
		for (petKey in petKeys) {
			row.insertCell().innerHTML = '<b>' + petKeys[petKey] + '</b>'
		}
	})
	return;
}



function accessFunction(){
	var input = document.getElementById("Input").value;

	var url = `https://api.github.com/user/repos?access_token=${input}`

	var dispTblGit = document.getElementById("gitRepos");
	var erro = document.getElementById("errorMess");

	if(dispTblGit) {
		dispTblGit.parentNode.removeChild(dispTblGit);
	}
	if(erro) {
		erro.parentNode.removeChild(erro)
	}

	createTable("gitRepos");
	dispTblGit = document.getElementById("gitRepos");

	fetch(url).then(function(response){
		return response.json();
	})
	.then(function(repoJson){
		let repoKeys = Object.keys(repoJson);
		if(repoKeys.includes("message")) {
	console.log(repoJson);
			createDiv("errorMess", "error");
			let erro = document.getElementById("errorMess")
			erro.innerHTML = "<h2> Enter valid access token and try again </h2>"
			return
		}

		for(repo in repoJson) {
			var row = dispTblGit.insertRow(repo);
			row.className = "tBodyRow"
			row.insertCell(0).innerHTML = repoJson[repo].name;
		}
	})
}



function searchFunction(){
   var error = document.getElementById("errorMess")
   if (error != null){
   		error.parentNode.removeChild(error)
   }
   var searchVal = document.getElementById("Input").value
   var url = `https://api.iextrading.com/1.0/stock/${searchVal}/company`;
console.log("MY URL", url);
	createTable("stockTable")
	let dispStock = document.getElementById("stockTable")

   var request = new XMLHttpRequest();
   request.open('GET', url);
   request.responseType = 'json';

   request.onload = function() {
      var resp = request.response;
console.log("GOT", resp);

	  if (resp == null){
	  	var s_table = document.getElementById("stockTable")
	  	if (s_table != null){
	  		s_table.parentNode.removeChild(s_table);
	  	}
	  	createDiv("errorMess", "error")
	  	document.getElementById("errorMess").innerHTML = "Invalid Corporation Symbol";
	  }
      var tblLen = dispStock.rows.length;
      var respKeys = Object.keys(resp);
      for(var i = 0; i < respKeys.length; i++) {

         if(tblLen === 0) {
            var row = dispStock.insertRow(i);
				row.className = "tBodyRow"
            row.insertCell(0).innerHTML = respKeys[i];
            row.insertCell(1).innerHTML = resp[respKeys[i]];
         } else if (tblLen === respKeys.length) {
            dispStock.rows[i].cells[1].innerHTML = resp[respKeys[i]];
         }
      }
   };

   request.send()
}

function personSearch() {
	// Setup to remove table and paragraph if exists
	var resTbl = document.getElementById("foundEntries")
	var resMsg = document.getElementById("resultMessage")
	var loadingIcon = document.getElementById("loadIcon")
	var homeBtn = document.getElementById("h")

	if(resTbl) {
		resTbl.parentNode.removeChild(resTbl);
	}

	if(resMsg) {
		resMsg.parentNode.removeChild(resMsg);
	}

	if(loadingIcon) {
		loadingIcon.parentNode.removeChild(loadingIcon);
	}

	homeBtn.disabled = true;

	var input = document.getElementById("searchParam").value;
	var url = `http://localhost:3000/personSearch?searchParam=${input}`
	url = encodeURI(url)

	createDiv("loadIcon", "loader");

	fetch(url, {mode:'cors'}).then(function(response){
		return response.json().then(function(myJson){
		console.log(myJson)
			let keys = Object.keys(myJson)


			var loadIcon = document.getElementById("loadIcon");
			loadIcon.parentNode.removeChild(loadIcon);
			homeBtn.disabled = false;

			createParagraph("resultMessage")
			createTable("foundEntries")

			let resMsg = document.getElementById("resultMessage")
			let entryTable = document.getElementById("foundEntries")
			let tblHeaderVal = ["Name", "Phone", "Dept", "Username", "Email"]
			if(!keys.length) {
				resMsg.innerHTML = "No entries found"
			} else {

				resMsg.innerHTML = `Found ${keys.length} entries`

				for(key in keys) {

					var entry = myJson[keys[key]]

					let entryKeys = Object.keys(entry)

					var row = entryTable.insertRow()
					row.className = "tBodyRow"
					for(entryKey in entryKeys) {
						row.insertCell().innerHTML = entry[entryKeys[entryKey]]
					}
				}

				let headerRow = entryTable.createTHead().insertRow(0)
				headerRow.className = "thRow"
				for(cellVal in tblHeaderVal) {
					headerRow.insertCell().innerHTML = '<b>' + tblHeaderVal[cellVal] + '</b>'
				}
			}
		})
	})
}
