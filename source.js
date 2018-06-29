/*pw: Bcde@345
google "how to build routes with vanilla javascript"
https://aws.github.io/aws-amplify/
*/
var keyUrl = location.hash.substring(1);

/*
eyJraWQiOiJTNlp6cWFZdzh2SlFcLyszUXRoUldnRGp6M0srTWFvOElTZWxST0RPSmh3TT0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiQ3BqZl9SZTI4WDZQck9Wam1VcEViQSIsInN1YiI6IjRiNzlmYjJlLTFjN2EtNDdkYi05NTQ3LTllN2RjZjBjZjI4OCIsImF1ZCI6IjJmaW9yNjc3MGh2dG80dTZrdXEwODRqN2Z1IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTMwMjEwMzk1LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl9MbG9kWWd5UU4iLCJjb2duaXRvOnVzZXJuYW1lIjoiYW1kZWxhdXIiLCJleHAiOjE1MzAyMTM5OTUsImlhdCI6MTUzMDIxMDM5NSwiZW1haWwiOiJhbWRlbGF1ckBjYWxwb2x5LmVkdSJ9.j3u8TR86-ctHrHPJefT18SkXlJTT92NO8Pw5KZB_NmOpsHjENBKLX00ntT9I5wfR5JM2RNqZy2R4tpKpG8od9Tqp6_UnXDIJaSZ4gIxk0Gq7crtMsmg5GAGEGISf1_CJ0oJSq6aHNL2I9PjZUjnyEB-961j0NZZ-lL34fssRC0ZhC8Lm2XZjKGpa0ncOh4wljUSCTZIcM-rRgLSGhuTfMyl3mGsdyurc6bMXnYjlt2QbNXj4vPmZvjhEh2l85eclsVX4XmXB4EMQkSABZKrRvwatoVWus94ABJVNDb0uTJe9PaNxEmYCGo5rLtRDjTrsONHQbPTl2QOe6ldOVH-6vQ
&access_token=eyJraWQiOiJ5ZXNrQ1RYOTZVVHJVZjhyMzFOaU5BZ21kUG9RbW9DbXJZTTNaQlBaZEZZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI0Yjc5ZmIyZS0xYzdhLTQ3ZGItOTU0Ny05ZTdkY2YwY2YyODgiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6InBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNTMwMjEwMzk1LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl9MbG9kWWd5UU4iLCJleHAiOjE1MzAyMTM5OTUsImlhdCI6MTUzMDIxMDM5NSwidmVyc2lvbiI6MiwianRpIjoiNTZkMjBlOWMtNzU0Zi00YzkyLWE5OGQtZDkyYzM2YmY1NDBmIiwiY2xpZW50X2lkIjoiMmZpb3I2NzcwaHZ0bzR1Nmt1cTA4NGo3ZnUiLCJ1c2VybmFtZSI6ImFtZGVsYXVyIn0.gItuiXsHUjWlwIa2AjU-dM_fBzBVZbSfOPPYa4BE6t_JyyDvDdGIywuX07fFtbi3n5900Q6pzaFp17GUCEAFVW3pZmgtedmLWr-Vog2aDeWIkSh-k94ERMn20nYboVc2WYa29WB8D5PhW8Ykz4O8-UGb4JBhfFVUreoo8rpMKHIT-YL1csfFr2PeNnO0T8X5uVz-loN6FHhRX7mvdqbhr6mbkwXMO2NwBpU3H_QXYnrrSmy_YR2Nt_ZRBIh19pW6trhPMWW97knEuZh8fFG_0pql0TRmSF_Zfjj-dPqldth9sArrObvgyyJWuitEVOTBD6sA4H5NM3LbHJqdptt9_Q&expires_in=3600&token_type=Bearer
*/


/*
//////////////ROUTER DEFINITION
var Router = {
    routes: [],
    mode: null,
    root: '/',
    config: function(options) {
        this.mode = options && options.mode && options.mode == 'history' 
                    && !!(history.pushState) ? 'history' : 'hash';
        this.root = options && options.root ? '/' + this.clearSlashes(options.root) + '/' : '/';
        return this;
    },
    getFragment: function() {
        var fragment = '';
        if(this.mode === 'history') {
            fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
            fragment = fragment.replace(/\?(.*)$/, '');
            fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
        } else {
            var match = window.location.href.match(/#(.*)$/);
            fragment = match ? match[1] : '';
        }
        return this.clearSlashes(fragment);
    },
    clearSlashes: function(path) {
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    },
    add: function(re, handler) {
        if(typeof re == 'function') {
            handler = re;
            re = '';
        }
        this.routes.push({ re: re, handler: handler});
        return this;
    },
    remove: function(param) {
        for(var i=0, r; i<this.routes.length, r = this.routes[i]; i++) {
            if(r.handler === param || r.re.toString() === param.toString()) {
                this.routes.splice(i, 1); 
                return this;
            }
        }
        return this;
    },
    flush: function() {
        this.routes = [];
        this.mode = null;
        this.root = '/';
        return this;
    },
    check: function(f) {
        var fragment = f || this.getFragment();
        for(var i=0; i<this.routes.length; i++) {
            var match = fragment.match(this.routes[i].re);
            if(match) {
                match.shift();
                this.routes[i].handler.apply({}, match);
                return this;
            }           
        }
        return this;
    },
    listen: function() {
        var self = this;
        var current = self.getFragment();
        var fn = function() {
            if(current !== self.getFragment()) {
                current = self.getFragment();
                self.check(current);
            }
        }
        clearInterval(this.interval);
        this.interval = setInterval(fn, 50);
        return this;
    },
    navigate: function(path) {
        path = path ? path : '';
        if(this.mode === 'history') {
            history.pushState(null, null, this.root + this.clearSlashes(path));
        } else {
            window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
        }
        return this;
    }
}




// configuration
Router.config({ mode: 'history'});
// returning the user to the initial state
Router.navigate();
// adding routes
Router
.add(/Display-Repos/, repoClick)
.add(/Check-Stock-Info/, searchClick)
.add(goHome(['h', 'bn', 'Input', 'display']))
.check().listen();
Router.navigate();
*/




///////////////////////////////FUNCTIONS TRIGGERED BY CLICKS


function goHome(idLst){
	//Router.navigate();
	wipeWholePage(idLst);
	var ogHead = document.getElementById("ogB");
	ogHead.style.display = "block";
}



function repoClick(){
	//Router.navigate('/Display-Repos/');
	createInputBox("Input");
	createButton("List Repos", "accessFunction()", "bn");
	removeHome();
	createButton("Go Home", "goHome(['h', 'bn', 'Input', 'display'])", "h");
	return;
}



function searchClick(){
	//Router.navigate(/Check-Stock-Info/);
	createInputBox("Input");
	createButton("Search Stock", "searchFunction()", "bn");
	removeHome();
	createButton("Go Home", "goHome(['h', 'bn', 'Input', 'display'])", "h");
	return;
}


function protectedClick(){
	console.log("js var : ", keyUrl);
	/*var realUrl = keyUrl.split("&");
	var id_token = realUrl[0].slice(9);*/

	document.cookie = keyUrl.replace("&", ";");
	var key = getCookie("id_token");
	console.log("pulled from cookie : ", key);
	if (key != ""){
		protectedContent(key);
	} else{
		window.location = "https://cognito-dev.calpoly.edu/login?response_type=token&client_id=2fior6770hvto4u6kuq084j7fu&redirect_uri=https://angelodel01.github.io";	
	}
	removeHome();
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

function setCookie(cname, cvalue, exdays) { //not used right now
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
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
	box.setAttribute("placeholder", "type here...");
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


/////////////////////////////////////////////CONTENT FUNCTIONS

function protectedContent(id_token){
	console.log("inside protectedContent()");
	console.log("id_token : ", id_token);
	createButton("Go Home", "goHome(['h', 'display'])", "h");
	createParagraph("display");
	document.getElementById("display").innerHTML = "SECRET SECRET SECRET";
	var url = "https://api-dev.calpoly.edu/pets";

	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');
	myHeaders.append('Authorization', 'Bearer ' + id_token);
	/*
	let headers = {
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + id_token
	}*/

	createParagraph("display");
	fetch(url, {headers: headers, mode : "cors",}).then(function(response){
		return response.json();	
		})
		.then(function(myJson){
			var len = myJson.length;
			var text= ""; 
			for (i = 1; i < len; i++){
				text += myJson[i].type + "<br>";
			}
			document.getElementById("display").innerHTML = text;
		})


	/*var data = null;
	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === 4) {
			document.getElementById("display").innerHTML = this.responseText;
		}
	});
	xhr.open("GET", "https://api-dev.calpoly.edu/pets");
	xhr.setRequestHeader("Authorization", "Bearer " + id_token);
	xhr.setRequestHeader("Access-Control-Allow-Credentials", true);
	xhr.setRequestHeader("Access-Control-Allow-Origin", "http://angelodel01.github.io/");
	xhr.withCredentials = true;
	xhr.setRequestHeader("Access-Control-Allow-Headers", "Content-Type");
	xhr.setRequestHeader("Access-Control-Request-Headers", "Content-Type");

	xhr.setRequestHeader("Access-Control-Request-Method", "GET");

	xhr.setRequestHeader("Access-Control-Allow-Methods", "GET");
	xhr.setRequestHeader("Cache-Control", "no-cache");
	//xhr.setRequestHeader("Postman-Token", "2ea7cd24-e6fd-4ae6-97a6-d9552ab4716e");

	xhr.send(data);*/
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




