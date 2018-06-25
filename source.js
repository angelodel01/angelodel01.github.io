
function searchFunction(){
	var request = new XMLHttpRequest();
	var input = document.getElementById("myText").value;

	request.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var resp = this.response;
    		document.getElementById("demo").innerHTML = "<b>Symbol : </b>" + resp.symbol +
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