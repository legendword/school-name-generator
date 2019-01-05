/*
 *     Author: legendword
 *     Created:   2019/01/04 18:29:02.524204
 *     Last Modified: 2019/01/04 19:28:36.898422
 *     Notes (if any): 
 */
var fs = require('fs');
var csv = {
	stringify: require('csv-stringify'),
	parse: require('csv-parse')
};

fs.readFile('original.txt', 'utf8', (err, data) => {
	if (err) throw err;
	//console.log(data);
	var i=-1;
	var inp = false;
	var parsed = new Array(""),pi = 0;
	//console.log(data.length);
	while (i+1<data.length){
		i++;
		//console.log(i,data[i],inp);
		
		if (data[i]=='（'){
			inp = true;
			continue;
		}
		else if (data[i]=='）'){
			inp = false;
			continue;
		}
		else if (inp) continue;
		else if (!isNaN(parseInt(data[i]))){
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
	//console.log(parsed);
	var cities = new Array();
	var output = "";
	parsed.forEach((j,i)=>{
		if (j.indexOf("学")==-1){
			if (cities.indexOf(j)==-1) cities.push(j);
		}
		else output += j+",";
	});
	console.log(output.slice(0,output.length-1));
	console.log(cities.join(','));
	//console.log(parsed);
});