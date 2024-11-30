var wordwebs = document.getElementById("wordwebs");

var connections = {
	"word1":{"x":300,"y":200,"word":"Breakfast Foods","show":true,
	"connectedIDs":["word2","word3","word4","word5"]
	},
	"word2":{"x":250,"y":160,"word":"Bacon","show":false,
	"connectedIDs":["word1","word10"]
	},
	"word3":{"x":250,"y":240,"word":"Eggs","show":false,
	"connectedIDs":["word1","word6","word7","word9","word8"]
	},
	"word4":{"x":340,"y":160,"word":"French Toast","show":false,
	"connectedIDs":["word1","word12"]
	},
	"word5":{"x":350,"y":240,"word":"Cereal","show":false,
	"connectedIDs":["word1"]
	},
	"word6":{"x":240,"y":300,"word":"Sunny Side Up","show":false,
	"connectedIDs":["word3"]
	},
	"word7":{"x":120,"y":270,"word":"Over-Easy","show":false,
	"connectedIDs":["word3"]
	},
	"word8":{"x":80,"y":230,"word":"Scrambled","show":false,
	"connectedIDs":["word3"]
	},
	"word9":{"x":140,"y":190,"word":"Chickens","show":false,
	"connectedIDs":["word3","word11"]
	},
	"word10":{"x":170,"y":110,"word":"Pigs","show":false,
	"connectedIDs":["word2","word11"]
	},
	"word11":{"x":60,"y":150,"word":"Farm Animals","show":false,
	"connectedIDs":["word9","word10"]
	},
	"word12":{"x":340,"y":120,"word":"Maple Syrup","show":false,
	"connectedIDs":["word4"]
	},
};
function tryWord(wordID,event){
	var word = document.getElementById(wordID);
	if (word.getAttribute("phrase").toLowerCase().indexOf(word.value.toLowerCase())==0){
			var phrase = word.getAttribute("phrase");
			word.setAttribute("placeholder",phrase.slice(0,word.value.length)+phrase.slice(word.value.length).replace(hideS,'*'));
		}
}

function createWord(x,y,phrase,show,wordid){
	var hideS = /[0-9a-zA-Z]/gi;
	var form = document.createElement("form");
	var word = document.createElement("input");
	var submit = document.createElement("input")
	submit.setAttribute("type","submit");
	submit.setAttribute("style","display: none;");
	word.setAttribute("type","text");
	word.setAttribute("phrase",phrase);
	word.setAttribute("amtSlvd",0);
	word.setAttribute("placeholder",show?phrase:phrase.replace(hideS,'*'));
	word.setAttribute('size',phrase.length);
	word.setAttribute("style","position:absolute; ");
	word.id = wordid;
	word.style.left = x+"px";
	word.style.top = y+"px";
	form.appendChild(word);
	form.appendChild(submit);
	wordwebs.appendChild(form);
	word.addEventListener('focusin',function(event){
		word.classList.add("selected-word");
		//Wordlists
		wordlist = connections[word.id]['connectedIDs']
		for (const w of wordlist){
			document.getElementById(w).classList.add("connected-word")
		}
	});
	word.addEventListener('focusout',function(event){
			word.classList.remove("selected-word");
				//Wordlists
		wordlist = connections[word.id]['connectedIDs']
		for (const w of wordlist){
			document.getElementById(w).classList.remove("connected-word")
		}
	});
	form.onsubmit = function(event,propogate=true){
		event.preventDefault();
		if ((word.getAttribute("phrase").toLowerCase().indexOf(word.value.toLowerCase())==word.getAttribute("amtSlvd")||word.getAttribute("phrase").toLowerCase().indexOf(word.value.toLowerCase())==0)&&word.value.length>word.getAttribute("amtSlvd")&&!connections[word.id].show){
			var phrase = word.getAttribute("phrase");
			word.setAttribute("placeholder",phrase.slice(0,word.value.length)+phrase.slice(word.value.length).replace(hideS,'*'));
			word.setAttribute("amtSlvd",word.value.length);
		}
				//Wordlists
		wordlist = connections[word.id]['connectedIDs']
		if (propogate){
		for (const w of wordlist){
			var wa = document.getElementById(w).parentElement;
			event.srcElement=wa;
			wa[0].value=word.value;
			wa.onsubmit(event,false);
		}
		}
		word.value="";
		form.reset();
	};
	return word;
}

document.addEventListener("DOMContentLoaded", function(){
	//This automates creation of our wordweb grids slightly
var ids = Object.keys(connections);
for (const a of ids){
var con = connections[a];
	createWord(con.x,con.y,con.word,con.show,a);
}
});