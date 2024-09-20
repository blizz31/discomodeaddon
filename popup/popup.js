function saveOptions(e) {

//////////////// ON - OFF TOGGLE /////////////////
	if (document.getElementById("cb-toggle").checked) {
	browser.storage.local.set({
		disableall: false
	    }); 
	}
	else {
	browser.storage.local.set({
		disableall: true
	    }); 	 	  
	}
//////////////////// disablechangingcolors ////////////////////////
	if (document.getElementById("ccOff").checked) {
	browser.storage.local.set({
		disablechangingcolors: true
	    }); 
	}
	else {
	browser.storage.local.set({
		disablechangingcolors: false
	    }); 	 	  
	}
	 
///////////////////// disableChangeStyles  //////////////////
	if (document.getElementById("csOff").checked) {
	browser.storage.local.set({
		disableChangeStyles: true
	    }); 
	}
	else {
	browser.storage.local.set({
		disableChangeStyles: false
	    }); 	 	  
	}

	if(e) {
		e.preventDefault();
	}
	
///////////////////// colourchangeinterval  //////////////////

	var interval = document.getElementById("ccinterval").value; 
	browser.storage.local.set({
		ccinterval: interval
	}); 

	if(e) {
		e.preventDefault();
	}
	
	browser.tabs.query({
		currentWindow: true
	}).then(sendMessageToTabs).catch(onError);	
}

function main() {
	let storageItem = browser.storage.local.get();
	storageItem.then(restoreOptions, onError);
}

function restoreOptions(res) {
	
	if (res.disableall) {
		document.getElementById("cb-toggle").checked = false;
	}
	else {
		document.getElementById("cb-toggle").checked = true;
	}
	
	if (res.disablechangingcolors) {
		document.getElementById("ccOff").checked = true;
	}
	else {
		document.getElementById("ccOff").checked = false;
	}
    
	if (res.disableChangeStyles) {
		document.getElementById("csOff").checked = true;
	}
	else {
		document.getElementById("csOff").checked = false;
	}
    
	if (res.ccinterval) {
		document.getElementById("ccinterval").value = res.ccinterval;
	}
	else {
		document.getElementById("ccinterval").value = 750; //default value
	}
	
}

function sendMessageToTabs(tabs) {
	for (const tab of tabs) {
		browser.tabs.sendMessage(
			tab.id,
			{message: "reloadSettings" }
		).then(response => {
			// Dont need to do anything here.
		}).catch(onError);
	}
}

function onError(error) {
  console.error(`Error: ${error}`);
}


// toggle button
var cb = document.querySelector('#cb-toggle');
cb.addEventListener('click', function() {
    var currentState;
    if (cb.checked) {
        currentState = 'on';
    } else {
        currentState = 'off';
    }
}, false);

document.addEventListener('DOMContentLoaded', main);
document.querySelector("form").addEventListener("submit", saveOptions);