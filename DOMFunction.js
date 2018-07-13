

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
