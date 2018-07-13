/*pw: Bcde@345
*/

var keyUrl = location.hash.substring(1);



//////////////////////////INTIALIZATION FUNCTIONS


var stateObj = {
	page : '#'
}

let initialize = function(){
	console.log("loading page... ", location.hash)
	if (location.hash){
		stateObj.page = location.hash.substring(1)
	}
console.log("replacing history..... ", stateObj.page)
	if(!window.history.state)
		window.history.replaceState(stateObj, "home", location.hash ? location.hash : "#");

	render(stateObj, false)
}
window.onload = function () {
console.log("LOADING PAGE");
	initialize()
}



;(function(window) {

  // exit if the browser implements that event
  if ("onhashchange" in window) { return; }

  var location = window.location,
    oldURL = location.href,
    oldHash = location.hash;

  // check the location hash on a 100ms interval
  setInterval(function() {
    var newURL = location.href,
      newHash = location.hash;

    // if the hash has changed and a handler has been bound...
    if (newHash != oldHash && typeof window.onhashchange === "function") {
      // execute the handler
      window.onhashchange({
        type: "hashchange",
        oldURL: oldURL,
        newURL: newURL
      });

      oldURL = newURL;
      oldHash = newHash;
    }
 }, 1000);

})(window);



window.onhashchange = function(jsonResp) {
	window.location = jsonResp.newURL
	render({page : location.hash.substring(1)}, false)
}
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
		case "PERSONSEARCH":
			personSearchClick(click_flag);
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
console.log("ADDING HOME TO HISTORY 0", click_flag);
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
		window.history.pushState({page : 'repo'}, 'repoPage', '#repo')
	}
	removeHome();
	wipeWholePage();

	createDiv("contentItems", "text")
	createInputBox("Input", "contentItems");
	createButton("List Repos", "accessFunction()", "bn", "contentItems");
	createButton("Go Home", "goHome(true)", "h", "contentItems");

	return;
}

function searchClick(click_flag){
	if (click_flag){
		window.history.pushState({page : 'stock'}, 'stockPage', '#stock')
	}
	removeHome();
	wipeWholePage();

	createDiv("contentItems", "text")
	createInputBox("Input", "contentItems");
	createButton("Search Stock", "searchFunction()", "bn", "contentItems");
	createButton("Go Home", "goHome(true)", "h", "contentItems");

	return;
}

function protectedClick(click_flag){
	if (click_flag && getCookie()){
		window.history.pushState({page : 'protected'}, 'protectedPage', '#protected')
	}
	removeHome();
	wipeWholePage();

	console.log("js var : ", keyUrl);

	protectedContent();
	window.location.hash = "";

	return;
}

function personSearchClick(click_flag) {
	if (click_flag){
		window.history.pushState({page : 'personSearch'}, 'personSearchPage',
		 '#personSearch')
	}

	removeHome();
	wipeWholePage();

	createDiv("contentItems", "text")
	createInputBox("searchParam", "contentItems");
	createButton("Search Person", "personSearch()", "bn", "contentItems");
	createButton("Go Home", "goHome(true)", "h", "contentItems");

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

/////////////////////////////////////////////CONTENT FUNCTIONS

function protectedContent(){
	console.log("inside protectedContent()");

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
console.log("key : ", key);
	if (key == ""){
		let client_id = "2fior6770hvto4u6kuq084j7fu";
		let redirect_uri = "https://angelodel01.github.io";
		let loginUrl = `https://cognito-dev.calpoly.edu/login?response_type=token&` +
		`client_id=${client_id}&redirect_uri=${redirect_uri}`;
		// window.location = "https://cognito-dev.calpoly.edu/login?response_type=token&client_id=2fior6770hvto4u6kuq084j7fu&redirect_uri=https://angelodel01.github.io";
		window.location = loginUrl
		return;
	}
	var key = getCookie("id_token");
console.log("key exists..... :", key)
	createDiv("contentItems", "text")
	createParagraph("display", "contentItems");
	createTable("petsTable", "contentItems");
	createButton("Go Home", "goHome(true)", "h", "contentItems");

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
