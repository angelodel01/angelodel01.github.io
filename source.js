/*pw: Bcde@345
*/
var keyUrl = location.hash.substring(1);

var stateObj = {
	page : '#'
}

let initialize = function(){
	console.log("loading page... ", location.hash)
	// let pg = location.hreflocation.origin
	if (location.hash){
		stateObj.page = location.hash.substring(1)
	}
console.log("replacing history..... ", stateObj.page)
	if(!window.history.state)
		window.history.replaceState(stateObj, "home", stateObj.page);
	else
		render(stateObj, false)
}
window.onload = function () {
console.log("LOADING PAGE");
	initialize()
}



// ;(function(window) {
//
//   // exit if the browser implements that event
//   if ("onhashchange" in window) { return; }
//
//   var location = window.location,
//     oldURL = location.href,
//     oldHash = location.hash;
//
//   // check the location hash on a 100ms interval
//   setInterval(function() {
//     var newURL = location.href,
//       newHash = location.hash;
//
//     // if the hash has changed and a handler has been bound...
//     if (newHash != oldHash && typeof window.onhashchange === "function") {
//       // execute the handler
//       window.onhashchange({
//         type: "hashchange",
//         oldURL: oldURL,
//         newURL: newURL
//       });
//
//       oldURL = newURL;
//       oldHash = newHash;
//     }
//  }, 100);
//
// })(window);
//
//
//
// window.onhashchange = function(jsonResp) {
// 	console.log("new hash ", jsonResp.newURL)
// 	console.log("old hash ", jsonResp.oldURL)
// console.log("HASH changed", location.hash.substring(1));
// 	render({page : location.hash.substring(1)})
// }
///////////////////////////////History popState

window.addEventListener('popstate', function (event) {
	if(event.state) {
		console.log(event.state)
		stateObj = event.state
	}

	render(stateObj, false);
})
//////////////////////////////// Renderer

function render(state, click_flag) {

	let to_render = state.page
	console.log("rendering state .....", to_render);
	switch(to_render.toUpperCase()) {
		case "REPO":
			 repoClick(click_flag)
			 break;
		case "STOCK":
			searchClick(click_flag);
			break;
		case "PROTECTED":
			protectedClick(click_flag);
			break;
		case "SIMPLESEARCH":
			simpleSearchClick(click_flag);
			break;
		case "#":
			goHome(click_flag);
			break;
		default:
			goHome(click_flag);
			break;
	}
}
///////////////////////////////FUNCTIONS TRIGGERED BY CLICKS

function goHome(click_flag){
	if (click_flag){
		console.log("ADDING HOME TO HISTORY", click_flag);
		window.history.pushState({page : '#'}, 'homePage', '#')
	}
	wipeWholePage();

	var ogHead = document.getElementById("ogB");
	ogHead.style.display = "block";
}

function repoClick(click_flag){
	if (click_flag){
		console.log("ADDING REPO TO HISTORY", click_flag);
		window.history.pushState({page : 'repo'}, 'repoPage', '#repo')
	}
	removeHome();
	wipeWholePage();

	createDiv("contentItems", "text")
	createInputBox("Input", "contentItems");
	createButton("List Repos", "accessFunction()", "bn", "contentItems");
	createButton("Go Home", "goHome()", "h", "contentItems");

	return;
}

function searchClick(click_flag){
	if (click_flag){
		console.log("ADDING STOCK TO HISTORY", click_flag);
		window.history.pushState({page : 'stock'}, 'stockPage', '#stock')
	}
	removeHome();
	wipeWholePage();

	createDiv("contentItems", "text")
	createInputBox("Input", "contentItems");
	createButton("Search Stock", "searchFunction()", "bn", "contentItems");
	createButton("Go Home", "goHome()", "h", "contentItems");

	return;
}

function protectedClick(click_flag){
	if (click_flag){
		window.history.pushState({page : 'protected'}, 'protectedPage', '#protected')
	}
	removeHome();
	wipeWholePage();

	console.log("js var : ", keyUrl);

	protectedContent();
	window.location.hash = "";

	return;
}

function simpleSearchClick(click_flag) {
	if (click_flag){
		console.log("ADDING SIMPLE SEARCH TO HISTORY", click_flag);
		window.history.pushState({page : 'simpleSearch'}, 'simpleSearchPage', '#simpleSearch')
	}

	removeHome();
	wipeWholePage();

	createDiv("contentItems", "text")
	createInputBox("searchParam", "contentItems");
	createButton("Search Person", "personSearch()", "bn", "contentItems");
	createButton("Go Home", "goHome()", "h", "contentItems");

	return;
}
/////////////////////////////MISCELLANEOUS FUNCTIONS

// make the request to the login endpoint
function getToken() {
	let client_id = "2fior6770hvto4u6kuq084j7fu";
	let redirect_uri = "https://angelodel01.github.io";
	let loginUrl = `https://cognito-dev.calpoly.edu/login?response_type=token&` +
	`client_id=${client_id}&redirect_uri=${redirect_uri}`;
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

function setCookie(cname, cvalue, exsecs) {
	var d = new Date();
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

function wipeWholePage(){
	var currNode = document.body.childNodes
	for (var i = 0; i < currNode.length; i++) {
		if(currNode[i].id !== "ogB" &&
		currNode[i].id !== undefined && currNode[i].nodeName !== "H"){
			console.log("Removing.....", currNode[i].id)
			currNode[i].parentNode.removeChild(currNode[i])
		}
	}
}
//////////////////////////////FUNCTIONS FOR CREATING ELEMENTS

function createButton(message, func, id, parentId){
	var mess;
	var btn;
	var parentNode = document.getElementById(parentId)

	btn = document.createElement("BUTTON");
	mess = document.createTextNode(message);
	btn.appendChild(mess);
	btn.setAttribute("id", id);
	btn.setAttribute("onClick", func);
	btn.setAttribute("class", "button");
	parentNode.appendChild(btn);
}

function createInputBox(id, parentId){
	var parentNode = document.getElementById(parentId)
	var box = document.createElement("INPUT");
	box.setAttribute("type", "text");
	box.setAttribute("placeholder", "Type here...");
	box.setAttribute("id", id);
	box.setAttribute("class", "textBox");
	parentNode.appendChild(box);
}

function createParagraph(id, parentId){
	var parentNode = document.getElementById(parentId)
	var p = document.createElement("P");
	p.setAttribute("type", "text");
	p.setAttribute("id", id);
	parentNode.appendChild(p);
}

function createTable(id, parentId){
	var parentNode = document.getElementById(parentId)
	var t = document.createElement("TABLE");
	t.setAttribute("type", "text");
	t.setAttribute("id", id);
	parentNode.appendChild(t);
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
		let client_id = "2fior6770hvto4u6kuq084j7fu";
		let redirect_uri = "https://angelodel01.github.io";
		let loginUrl = `https://cognito-dev.calpoly.edu/login?response_type=token&` +
		`client_id=${client_id}&redirect_uri=${redirect_uri}`;
		// window.location = "https://cognito-dev.calpoly.edu/login?response_type=token&client_id=2fior6770hvto4u6kuq084j7fu&redirect_uri=https://angelodel01.github.io";
		window.location = loginUrl
		return;
	}

	createDiv("contentItems", "text")
	createParagraph("display", "contentItems");
	createTable("petsTable", "contentItems");
	createButton("Go Home", "goHome()", "h", "contentItems");

	id_token = key
	document.getElementById("display").innerHTML = "<h2>PROTECTED CONTENT " +
	"ACCESS GRANTED</h2><br><h4> You can now view and buy pets</h4>";

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

		createTable("gitRepos", "contentItems");
		dispTblGit = document.getElementById("gitRepos");

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
	createTable("stockTable", "contentItems")
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
			document.getElementById("errorMess").innerHTML = "<h2> Invalid " +
			"Corporation Symbol </h2>";
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

			createParagraph("resultMessage", "contentItems")
			createTable("foundEntries", "contentItems")

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
					headerRow.insertCell().innerHTML = '<b>' +
					tblHeaderVal[cellVal] + '</b>'
				}
			}
		})
	})
}
