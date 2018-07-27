
// Cookie FUNCTIONS

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

	let cookieObj = {
		"value" : cvalue,
		"expDate" : expires
	}
	document.cookie = cname + "=" + JSON.stringify(cookieObj) + ";" + expires + ";path=/";
}





function removeProtected(){
  const temp = document.getElementById("temp");
  if (temp != undefined){
    temp.parentNode.removeChild(temp);
  }
}

// CREATE FUNCTIONS
// These functions are each responsible for creating a different elements
// Appends them to the parentNode designated by the given parentId.
//

// Creates html "Button"
// function createButton(message, func, id, parentId){
// 	var mess;
// 	var btn;
// 	var parentNode = document.getElementById(parentId)
//
// 	btn = document.createElement("BUTTON");
// 	mess = document.createTextNode(message);
// 	btn.appendChild(mess);
// 	btn.setAttribute("id", id);
// 	btn.setAttribute("onClick", func);
// 	btn.setAttribute("class", "button");
// 	parentNode.appendChild(btn);
// }

// Creates html "input"
function createInputBox(id, parentId){
	var parentNode = document.getElementById(parentId)
	var box = document.createElement("INPUT");
	box.setAttribute("type", "text");
	box.setAttribute("placeholder", "Type here...");
	box.setAttribute("id", id);
	box.setAttribute("class", "textBox");
	parentNode.appendChild(box);
}

// Creates html "p" elements
function createParagraph(id, parentId){
	var parentNode = document.getElementById(parentId)
	var p = document.createElement("P");
	p.setAttribute("type", "text");
	p.setAttribute("id", id);
	parentNode.appendChild(p);
}

// Creates html "Table" elements
function createTable(id, parentId){
	var parentNode = document.getElementById(parentId)
	var t = document.createElement("TABLE");
	t.setAttribute("type", "text");
	t.setAttribute("id", id);
	parentNode.appendChild(t);
}


// Creates html "div" elements
function createDiv(id, clas, parentId){
	var parentNode;
	if(!parentId)
		parentNode = document.body
	else
		parentNode = document.getElementById(parentId)

	var d = document.createElement("DIV");
	d.setAttribute("id", id);
	d.setAttribute("class", clas);
	parentNode.appendChild(d);
}
