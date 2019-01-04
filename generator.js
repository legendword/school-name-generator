/*
School Name Generator by Legendword.

	This program aims at helping distinguish different schools by calculating all possible common
		school names for a school.
	This program is originally designed for OIerDB (http://bytew.net/OIer), but this program can be
		used and will be used for other purposes related to school names.
	Due to the simplicity of the names of schools in North America, this program does not support
		generation of English names. But support for English names may be added later on.

Function Overview:
	As of this version, this program is able to do the following:
		Generate all possible common names of a Chinese high school, given its longest name.
	In future versions, this program will be able to do the following:
		Guess the complete name (longest name) of a Chinese high school, given any of its names.
		Support for university name generation, thus allowing names like "**大学附属中学" to be
			processed better. (by creating abbreviations like "山大","哈工大")
*/
//feel free to change these settings to fit your needs
var s = {
    mode: "single", //default mode
    debug: false, //set to true for debug information
    outputMode: {
    	lineByLine: false, //default is true, which outputs all possible names line by line
    	joinChar: "," //if lineByLine is false, specify which character you want to use between names
    },
    input: "" //used for user input, don't change
};
const keywords = { //keywords for general rules
    ignorable: ["省", "市", "区", "镇"], //these keywords can be ignored
    replaceable: [ //these keywords can exchange with each other
        {
        	from: "附属中学",
        	to: "附中"
        },{
        	from: "中学",
        	to: "中",
        	onlyIfPos: [0,"第"],
        	onlyIfLongerThan: 1,
        	removeCharAtPos: true
        }
    ],
    removable: [{
    	word: "省",
    	onlyIfHasWord: "市"
    }]
};
const breakables = ["省", "市", "区", "镇", "附属中学", "中学校", "中学", "校区", "部"]; //used for determining parts of the name
const version = "v1.0.1002";
var inputWait = "";
var ans,outputTemp;

//begin code trunk
var codeTrunks = {
    init: () => {
    	console.log("---School Name Generator--- "+version);
        console.log("Enter Mode: [Leave Blank For Default] (Default Mode: "+s.mode+")");
        inputWait = "mode";
        nextTrunk = "main";
    },
    main: () => {
    	console.log("Enter the longest name of the school:");
    	inputWait = "input";
    	//nextTrunk = s.mode=="single"?"cal":"cal"; //only single mode supported for now
    	nextTrunk = "cal";
    },
    cal: () => {
    	if (s.input=="") {
    		console.log("Invalid Input.");
    		codeTrunks.main();
    		return;
    	}
    	var parts = [""];
    	var crt = 0;
    	ans = [];
    	//part split core code
    	for (var i=0;i<s.input.length;i++){
    		for (var j=0;j<breakables.length;j++){
    			if (s.input[i]==breakables[j][0]){
    				var k = 1;
    				while (k<breakables[j].length){
    					if (i+k>=s.input.length||s.input[i+k]!=breakables[j][k]) break;
    					k++;
    				}
    				if (k==breakables[j].length){ //match
    					parts[++crt] = breakables[j];
    					parts[++crt] = "";
    					i += k;
    					break;
    				}
    			}
    		}
    		if (i<s.input.length) parts[crt] += s.input[i];
    		
    	}
    	if (s.debug) console.log(parts);
    	var p = 0;
    	for (var i=1;i<parts.length;i+=2){
    		//add original part
    		ans[p] = new Array(parts[i-1]+parts[i]);
    		//check for ignorable keywords
    		if (keywords.ignorable.indexOf(parts[i])>-1){
    			ans[p].push(parts[i-1]);
    		}
    		//check for replaceable keywords
    		for (var j=0;j<keywords.replaceable.length;j++){
    			if (keywords.replaceable[j].from==parts[i]){
    				//apply rules
    				if (keywords.replaceable[j].onlyIfMode!=null){
    					if (keywords.replaceable[j].onlyIfMode!=s.mode){
    						continue;
    					}
    				}
    				if (keywords.replaceable[j].onlyIfHasWord!=null){
    					var k;
    					for (k=1;k<parts.length;k+=2){
    						if (keywords.replaceable[j].onlyIfHasWord==parts[k]){
    							break;
    						}
    					}
    					if (k>=parts.length) continue;
    				}
    				if (keywords.replaceable[j].onlyIfLongerThan!=null){
    					if (parts[i-1].length<=keywords.replaceable[j].onlyIfLongerThan) continue;
    				}
    				if (keywords.replaceable[j].onlyIfPos!=null){
    					if (parts[i-1][keywords.replaceable[j].onlyIfPos[0]]!=keywords.replaceable[j].onlyIfPos[1]) continue;
    					var nw;
    					if (keywords.replaceable[j].removeCharAtPos){
    						nw = parts[i-1].slice(0,keywords.replaceable[j].onlyIfPos[0]);
    						nw += parts[i-1].slice(keywords.replaceable[j].onlyIfPos[0]+1,parts[i-1].length);
    					}
    					else nw = parts[i-1];
    					nw += keywords.replaceable[j].to;
    					ans[p].push(nw);
    				}
    				else ans[p].push(parts[i-1]+keywords.replaceable[j].to);
    			}
    		}
    		//removable keywords
    		for (var j=0;j<keywords.removable.length;j++){
    			if (keywords.removable[j].word==parts[i]){
    				//apply rules, which are almost the same as above
    				if (keywords.removable[j].onlyIfMode!=null){
    					if (keywords.removable[j].onlyIfMode!=s.mode){
    						continue;
    					}
    				}
    				if (keywords.removable[j].onlyIfHasWord!=null){
    					var k;
    					for (k=1;k<parts.length;k+=2){
    						if (keywords.removable[j].onlyIfHasWord==parts[k]){
    							break;
    						}
    					}
    					if (k>=parts.length) continue;
    				}
    				if (keywords.removable[j].onlyIfLongerThan!=null){
    					if (parts[i-1].length<=keywords.removable[j].onlyIfLongerThan) continue;
    				}
    				if (keywords.removable[j].onlyIfPos!=null){
    					if (parts[i-1][keywords.removable[j].onlyIfPos[0]]!=keywords.removable[j].onlyIfPos[1]) continue;
    				}
    				ans[p].push("");
    			}
    		}
    		p++;
    	}
    	if (s.debug) console.log(ans);
    	if (!s.outputMode.lineByLine) outputTemp = new Array();;
    	codeTrunks.outputAll(0,"");
    	if (!s.outputMode.lineByLine) console.log(outputTemp.join(s.outputMode.joinChar));
    	//after this, run main() to achieve loops
    	codeTrunks.main();
    },
    outputAll: (g,ss) => {
    	if (g>=ans.length) {
    		if (s.outputMode.lineByLine) console.log(ss);
    		else outputTemp.push(ss);
    		return;
    	}
    	for (var i=0;i<ans[g].length;i++){
    		codeTrunks.outputAll(g+1,ss+ans[g][i]);
    	}
    }
};
var nextTrunk = "init";
//end code trunk

//init readline module
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

//listen for line input
rl.on('line', function(line) {
    //console.log(line);
    if (inputWait != "") {
        s[inputWait] = line == "" ? s[inputWait] : line;
        codeTrunks[nextTrunk]();
    }
});

codeTrunks[nextTrunk]();
