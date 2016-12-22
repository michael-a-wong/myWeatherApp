function callbackFunction (data) {

	model.data = data; 
	view.makeView(model.data);  
}



function lookupWoeid() {
	view.makeWoeid(); 
}

function placeCallback(data) {
	model.woeid = data; 
	view.passData(model.woeid); 
}