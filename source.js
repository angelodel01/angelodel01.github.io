var stateObj = {
	page : '#'
}

//////////////////////////INTIALIZATION FUNCTIONS
// Initializes history state
let initialize = function(){
	console.log("loading page... ", location.hash)
	if (location.hash){
		console.log("location.hash != ''")
		stateObj.page = location.hash.substring(1)
	}
	if(!window.history.state){
		console.log("replacing history..... ", stateObj.page);
		window.history.replaceState(stateObj, "home", location.hash ? location.hash : "#");
	}
	render(stateObj, false)
}

// Renders page based on the history state when window loads
window.onload = function () {
	console.log("LOADING PAGE");
	let keyUrl = location.hash.substring(1);
	if (keyUrl.includes("id_token")){
		var id_tokenVal = keyUrl.substring("id_token=".length, keyUrl.indexOf("&"))
		var exprIndex = keyUrl.indexOf("expires_in") + "expires_in=".length
		var exprVal = keyUrl.substring(exprIndex, keyUrl.indexOf("&", exprIndex))

		console.log("expiration time : ", exprVal);

		setCookie("id_token", id_tokenVal, exprVal);
		window.location = window.location.origin
	} else {
		initialize()
	}
}

// Polls for hash changes(mostly for deep link page loads)
// src: https://developer.mozilla.org/en-US/docs/Web/Events/hashchange
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

// Triggered by a change in hashfrag that causes the page to re-render
window.onhashchange = function(jsonResp) {
		window.location = jsonResp.newURL
		render({page : location.hash.substring(1)}, false)
}

// Event listener for use of back or front button
window.addEventListener('popstate', function (event) {
	if(event.state) {
		console.log(event.state)
		stateObj = event.state
	}
console.log("stateObj.page :", stateObj.page);
	render(stateObj, false);
})

// Renders the page based on the page attribute of the history state
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

///////////////////////////////BUTTON CLICK FUNCTIONS 
// Navigates back home to the homepage
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

// Navigates to repo page
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

// Navigates to stock page
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

// Handles redirection and verification for protected page
function protectedClick(click_flag){

	if (click_flag && (getCookie("id_token") != "")){
		window.history.pushState({page : 'protected'}, 'protectedPage', '#protected')
	}
	removeHome();
	wipeWholePage();
	protectedContent();
	return;
}

// Navigates to personSearch page
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
/////////////////////////////COOKIE FUNCTIONS
// src: https://www.w3schools.com/js/js_cookies.asp

// Gets the value of a cookie where cname is the key
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


// Sets cookie where cvalue is the value. cname is the key and exsecs are the seconds till expiration
function setCookie(cname, cvalue, exsecs) {
	var d = new Date();
	d.setTime(d.getTime() + exsecs*1000)
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
