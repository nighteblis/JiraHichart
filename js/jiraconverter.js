

/**
 *
 * convert jiragadget data to chart data
 * lihao
 *
 * */

var jiraGadgetConverter=function()
{

this.rawdata=null;
this.chartdata=[];
this.piechartdata=this.chartdata;
this.linepointdata=[];
this.prioritydata=[];
this.prioritytitle=[];


// function defination
this.convert2highchartsData=function(object){

var rows = object.rows;

this.rawdata = object;

var thiz=this;

var totalPercentage = 0;

console.log(object);
//console.log(thiz.chartdata);
rows.forEach(thiz.logArrayElements,thiz);
//console.log(thiz.chartdata);

var x = (new Date()).getTime();
var chartdataLength = thiz.chartdata.length;

// convert data to  pie chart data
for(var i = 0 ; i < thiz.chartdata.length ; i ++){

    // console.log(thiz.chartdata[i].name+thiz.chartdata[i].y);
    // console.log(chartdataLength-1);
    //console.log(thiz.chartdata[i].y/thiz.chartdata[chartdataLength-1].y);
    if(i==(chartdataLength -1)) {
thiz.linepointdata=[x,thiz.chartdata[i].y];
thiz.chartdata.pop(); break;

}
    if(i==(chartdataLength - 2)) {
       //console.log("percentage - "+totalPercentage); 
 //      thiz.chartdata[i].y = parseFloat((1 - totalPercentage).toFixed(4));
       }
    else
{
  //  thiz.chartdata[i].y = parseFloat((thiz.chartdata[i].y/thiz.chartdata[chartdataLength-1].y).toFixed(4));
    //console.log(thiz.chartdata[i].name+thiz.chartdata[i].y);
   // totalPercentage += thiz.chartdata[i].y;
}

}

// get priority title (title count would be changed ,if no blocker issues , blocker will not show by default-jira )
object.firstRow.cells.forEach(thiz.firstRowForEach,thiz);
console.log(thiz.chartdata);
console.log(thiz.linepointdata);
console.log(thiz.prioritytitle);
console.log(thiz.prioritydata);

return  thiz.chartdata;

};




this.arrayToPieData = function(){

var thiz = this;

var totalPercentage = 0;
var chartdataLength = thiz.chartdata.length;

//console.log(thiz.chartdata);

for(var i = 0 ; i < thiz.chartdata.length ; i ++){

    thiz.chartdata[i].y = thiz.chartdata[i].y/thiz.chartdata[chartdataLength-1];
        if(i==(chartdataLength -1)) thiz.chartdata.pop();  // last data "合计数据" need to be poped, it's useless for the pie chart

        }

        //console.log(thiz.chartdata);
        return  thiz.chartdata;

}

// for each callbacks , get all datas from restuful api responed
this.logArrayElements = function(element, index, array) {

// console.log('a[' + index + '] = ' + element.cells[element.cells.length-1].markup);
 var data = element.cells[element.cells.length-1].markup;
 var legend = element.cells[0].markup;

// var chartdata = [];
//console.log(data);
var patt2 = /<.*>(.*)</m; 

result2 = patt2.exec(data);
result = patt2.exec(legend);

if(result){

//console.log(result[1]);
legend = result[1];
}
else {

//console.log(legend);
}
if(result2)
{
//console.log(result2[1]); 
data=result2[1];}
else {
//console.log(data);
}

//console.log(array);
//console.log(this);
var thiz=this;

//console.log(parseFloat(data));
//console.log(parseFloat("abc"));

//console.log(thiz.chartdata);
thiz.chartdata.push({name:legend,y:parseFloat(data)});

//thiz.chartdata.push(legend);
//console.log(thiz.chartdata);


//***get the last data by priority***//
if(index == (thiz.rawdata.rows.length-1)){
   for(var i = 1;i < element.cells.length ; i ++){
    console.log(element.cells[i].markup);
       result = patt2.exec(element.cells[i].markup);
     if(result){

       thiz.prioritydata.push(result[1]);
}
else {

       thiz.prioritydata.push(element.cells[i].markup);
}
 

   }
 
}

}


this.firstRowForEach = function(element,index,array){

  var thiz=this;

  var data = element.markup;
   var patt2 = /<.*>(.*)</m;
   result = patt2.exec(data);
   if(result){

  // console.log(result[1]);
   data = result[1];
   }
   else {

   //console.log(data);
   }

thiz.prioritytitle.push(data);
//console.log("title pushed ....");

}

};
