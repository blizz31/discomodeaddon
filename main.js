var intervalId;
var disablechangingcolors = false;
var disableChangeStyles = false;
var colourChangeInterval = 750;
var disableAll = false;

function reloadSettings(res) {
	disablechangingcolors = res.disablechangingcolors;
	disableChangeStyles = res.disableChangeStyles;
	disableAll = res.disableall;
	if (res.ccinterval) {
		colourChangeInterval = res.ccinterval;	
	}
	else {
		colourChangeInterval = 750;
	}
	initiate();
}	

// START 
var storageItem = browser.storage.local.get();
storageItem.then(reloadSettings, onError);

function initiate() {
	console.log("disablechangingcolors: " + disablechangingcolors);
	console.log("disableChangeStyles: " + disableChangeStyles);
	console.log("colourChangeInterval: " + colourChangeInterval);
	console.log("disableAll: " + disableAll);
	if (!disableAll) {
		if(disablechangingcolors) {
			main();	
		}
		else {
			intervalId = setInterval(main, colourChangeInterval);
		}	
	}
}

function main() {
		
	discofy(document.getElementsByTagName('p'));
	discofyByCSS(document.getElementsByTagName('a'));
	discofyByCSS(document.getElementsByTagName('h1'));
	discofyByCSS(document.getElementsByTagName('h2'));
	discofyByCSS(document.getElementsByTagName('h3'));
	discofyByCSS(document.getElementsByTagName('h4'));
	discofyByCSS(document.getElementsByTagName('h5'));
	discofyByCSS(document.getElementsByTagName('h6'));
	discofyByCSS(document.getElementsByTagName('div'));
	discofyByCSS(document.getElementsByTagName('li'));
	discofyByCSS(document.getElementsByTagName('td'));
	discofyByCSS(document.getElementsByTagName('th'));
	discofyByCSS(document.getElementsByTagName('span'));
	discofyByCSS(document.getElementsByTagName('div'));
	
	//discofyImage(document.getElementsByTagName('img'));
}



function discofyByCSS(elementArray) {

    for (var i = 0; i < elementArray.length; i++) {
        elementArray[i].style.color = getRandomCssColor();
    }
}

function discofy(elementArray) {
	for(let i=0; i < elementArray.length; i++) {

		var words = elementArray[i].textContent.split(' ');
		
		var wrappedWords = words.map(function(word) {
			var span = generateRandomSpan();
            return  span + word + '</span>';
        });
		
		elementArray[i].innerHTML = wrappedWords.join(' ');
		
	}	
}

// NOT USED (adds colourful border around images)
function discofyImage(elementArray) {
    for (var i = 0; i < elementArray.length; i++) {
		elementArray[i].style.borderStyle = "solid";
        elementArray[i].style.borderWidth  = "thick";
		elementArray[i].style.borderColor = getRandomCssColor();
    }
}

// Returns a string
function generateRandomSpan() {
		var color = getRandomCssColor();
		var fontStyle = getRandomFontStyle();
		if(disableChangeStyles) {
			return "<span style='color: " + color + ";'>";
		}
		else {
			return "<span style='color: " + color + ";font-style:" + fontStyle + ";'>";
		}	
}

// returns a random CSS colour string
function getRandomCssColor() {
    // List of known CSS color names
    var cssColors = [
        "AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", 
        "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", 
        "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", 
        "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", 
        "DarkGray", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", 
        "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", 
        "DarkSlateBlue", "DarkSlateGray", "DarkTurquoise", "DarkViolet", "DeepPink", 
        "DeepSkyBlue", "DimGray", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", 
        "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Green", 
        "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", 
        "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", 
        "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGreen", 
        "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", 
        "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", 
        "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", 
        "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", 
        "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", 
        "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", 
        "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", 
        "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", 
        "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", 
        "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", 
        "SlateGray", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", 
        "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"
    ];

    // Select a random color from the array
    var randomIndex = Math.floor(Math.random() * cssColors.length);
    
    // Return the randomly selected color
    return cssColors[randomIndex];
}

// returns a random css font style string
function getRandomFontStyle() {
    // List of common CSS font styles
    var fontStyles = [
        "normal",      // Default, normal font style
        "italic",      // Italic text
        "oblique",     // Oblique (slanted) text
        "bold",        // Bold text
        "bolder",      // Bolder text
    ];

    // Select a random font style from the array
    var randomIndex = Math.floor(Math.random() * fontStyles.length);
    
    // Return the randomly selected font style
    return fontStyles[randomIndex];
}

browser.runtime.onMessage.addListener((request) => {
  console.log("Message from the background script:");
  console.log(request.message);
  if(request.message == "reloadSettings") {
		clearInterval(intervalId);
		var storageItem = browser.storage.local.get();
		storageItem.then(reloadSettings, onError);
  }
  return Promise.resolve({ response: "Received." });
});

function onError(error) {
	console.info("An error occurred: " + error);
}
