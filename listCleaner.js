/*
 *     Author: legendword
 *     Created:   2019/01/04 18:29:02.524204
 *     Last Modified: 2019/01/04 18:44:44.381490
 *     Notes (if any): 
 */
var fs = require('fs');

fs.readFile('original.txt', 'utf8', (err, data) => {
	if (err) throw err;
	//console.log(data);
	var i=-1;
	var inp = false;
	var parsed = new Array(""),pi = 0;
	while (i+1<data.length){
		i++;
		if (!isNaN(parseInt(data[i]))){
			continue;
		}
		if (inp) continue;
		if (data[i]=='（'){
			inp = true;
			continue;
		}
		else if (data[i]=='）'){
			inp = false;
			continue;
		}
		else if (data[i]=='*'||data[i]=='+') continue;
		else if (data[i]==' '||data[i]=='\n'){
			if (parsed[pi]!=''){
				pi++;
				parsed[pi] = '';
			}
		}
		else{
			parsed[pi] += data[i];
		}
	}
	var cities = new Array();
	var output = "";
	parsed.forEach((j,i)=>{
		if (j.indexOf("学")==-1){
			cities.push(j);
		}
		else output += j+",";
	});
	console.log("schools = [",output,"];");
	console.log("cities = [",cities.join(','),"];");
	//console.log(parsed);
});