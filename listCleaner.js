/*
 *     Author: legendword
 *     Created:   2019/01/04 18:29:02.524204
 *     Last Modified: 2019/01/04 20:16:20.244226
 *     Notes (if any): 
 */
var fs = require('fs');
var csv = {
	stringify: require('csv-stringify'),
	parse: require('csv-parse')
};

var keyword = ['id','name','code','department','location','level','note'];
var ans = [];
var parseRow = (st) => {
	//console.log(st);
	var begin = 0,end = 0,ctr = 0;
	var da = {};
	while (st.length>0){
		begin = st.indexOf('<td>');
		end = st.indexOf('</td>');
		da[keyword[ctr]] = parseCol(st.slice(begin+4,end));
		st = st.slice(end+5,st.length);
		ctr++;
	}
	da.note = da.note.slice(0,da.note.length-1);
	ans.push(da);
};
var parseCol = (st) => {
	st = st.slice(st.indexOf('>')+1,st.length);
	st = st.slice(0,st.indexOf('<')==-1?st.length:st.indexOf('<'));
	//if (st=='\n') return '';
	return st;
};
//more complex parsing -- info from wikipedia chart
fs.readFile('chartOriginal.txt', 'utf8', (err, data) => {
	if (err) throw err;
	var begin = 0,end = 0,ctr = 0;
	while (data.length>0){
		begin = data.indexOf('<tr>');
		end = data.indexOf('</tr>');
		parseRow(data.slice(begin+4,end));
		data = data.slice(end+5,data.length);
		//ctr++;
	}
	csv.stringify(ans,{
		columns: keyword
	},(err, dt) => {
		if (err) throw err;
		fs.writeFile('chartOutput.csv', dt, {
			encoding: 'utf8',
			flag: 'a'
		}, (err) => {
			if (err) throw err;
			console.log("done");
		})
		//console.log(dt);
	})
	//console.log(csv.stringify(ans));
});
/* //for simple data parsing
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
*/