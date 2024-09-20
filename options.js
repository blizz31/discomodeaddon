function saveOptions(e) {
	
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

}

function restoreOptions() {
  let storageItem = browser.storage.local.get('disablechangingcolors');
  storageItem.then((res) => {	
		if (res.disablechangingcolors) {
			document.getElementById("ccOff").checked = true;
		}
		else {
			document.getElementById("ccOff").checked = false;
		}
    
  });
    
  storageItem = browser.storage.local.get('disableChangeStyles');
  storageItem.then((res) => {	
		if (res.disableChangeStyles) {
			document.getElementById("csOff").checked = true;
		}
		else {
			document.getElementById("csOff").checked = false;
		}
    
  });
  
  storageItem = browser.storage.local.get('ccinterval');
  storageItem.then((res) => {	
		if (res.ccinterval) {
			document.getElementById("ccinterval").value = res.ccinterval;
		}
		else {
			document.getElementById("ccinterval").value = 750; //default value
		}
    
  });
	
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);