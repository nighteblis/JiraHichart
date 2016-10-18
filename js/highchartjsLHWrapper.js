

/*
function mytest(member)
{
	this.member=member;
	
	this.update=function()
	{
		console.log(this);
		var thiz = this;
		
		setTimeout(function(){thiz.update()},10000);
		console.log("updated..."+this.member);
		
	}
	
}

new mytest("hi").update();
*/

function planBoard(updateInterval)
{
	



}



function priorityBoard(selectorsArray,updateInterval)
{

//this.blockerR=b;
//this.criticalR=c;
//this.majorR=m;
//this.undermajorR=u;
this.updateInterval=updateInterval;

this.updateOnce=function(data)
{
	
	var thiz=this;
	//console.log(data);
	
	for(i = 0 ; i < data.prioritytitle.length ;i++)
		{
		
                var selector = "#"+data.prioritytitle[i];
		//console.log("original text: "+$(selectorsArray[i]).text()+" new: "+data[i].toString());
		
		if( data.prioritytitle[i] != "合计:" &&  $(selector).text() !== data.prioritytitle[i]+": "+data.prioritydata[i].toString() )
//		var tmpdata = data[i];
//		var tmpselector = selectorsArray[i];
//		console.log(tmpdata);
			{
                console.log(selector);
		//console.log("original text: "+$(selector).text()+" new: "+data[i].toString());
			$(selector).fadeOut(300);
			$(selector).text(data.prioritytitle[i]+": "+data.prioritydata[i]).fadeIn(300);   
			}
		
		}

};

this.startUpdate=function(updateCallback){	
	//console.log(this.chart);
	//console.log(updateCallback());
	var data = updateCallback();
	// data = [x,y,z,x];
	
	// data check
	
	var thiz=this;
	//console.log(data);
	
	for(i = 0 ; i < selectorsArray.length ;i++)
		{
		
		//console.log("original text: "+$(selectorsArray[i]).text()+" new: "+data[i].toString());
		
		if($(selectorsArray[i]).text() !== data[i].toString() )
//		var tmpdata = data[i];
//		var tmpselector = selectorsArray[i];
//		console.log(tmpdata);
//		
			{
			$(selectorsArray[i]).fadeOut(300);
			$(selectorsArray[i]).text(data[i]).fadeIn(300);   
			}
		
		}
	
    
	//var a = this.startUpdate;
	setTimeout(function(){thiz.startUpdate(updateCallback);},thiz.updateInterval);
	//console.log("updated...");
};


}




function highchartjsLHWrapper(hichart,updateInterval) {
	
	console.log(hichart+" "+" "+updateInterval);

	this.chart = new Highcharts.Chart(hichart);
	this.chartDef = hichart;
	
	this.updateInterval = updateInterval;
	
	//this.updateCallback=updateCallback;

	this.setChart=function(chart){
		
		this.chart.chart = chart;
		
	};
	
	this.setTitle=function(title){
		console.log(this.chart);
		this.chart.title= {text:title};
		//this.chart.redraw();
		//console.log(this.chart.title);
		
	};
	
	this.setTooltip=function(tooltip){
		this.chart.tooltip=tooltip;
		
	};    
    
	
	this.setPlotOptions=function(plotOptions){
		this.chart.plotOptions=plotOptions;
		
	};    
    
	
	this.setSeries=function(series){
		this.chart.series=series;
		
	};    
    
	this.setXAxis=function(xAxis){
		this.chart.xAxis=xAxis;
		
	};    
    
	
	this.setYAxis=function(yAxis){
		this.chart.yAxis=yAxis;
		
	};    
    
    // update once with the data
	this.updateOnce=function(data)
	{
		
		var thiz=this;
		
		// pie chart
		if(thiz.chartDef.chart.type == "pie")
			{
			
			thiz.chart.series[0].setData(data,true);
			}
		
		// line chart , date time xaxis
		else if(thiz.chartDef.chart.type == "spline")
			{
		
			for(var i = 0 ; i < data.length ; i++)
				{
				    console.log(i);
				    console.log(data[i]);
				    if(data[i]!= null && data[i].length > 1)
					{ 
				    	var shift1 = thiz.chart.series[i].data.length > 100;
				    	thiz.chart.series[i].addPoint(data[i], false, shift1);
					}
					
				}			
//			var shift1 = thiz.chart.series[1-1].data.length > 20;
//			data1 = updateCallback();
//			var shift2 = thiz.chart.series[2-1].data.length > 20;
//			thiz.chart.series[1-1].addPoint(data, false, shift1);
//			thiz.chart.series[2-1].addPoint(data1, false, shift2);
			console.log("redraw line");
			thiz.chart.redraw();
			}		
		
		
	};
	
	
	this.startUpdate=function(updateCallback){	
		//console.log(this.chart);
		//console.log(updateCallback());
		var data = null;
		var data1 = null;
		var thiz=this;
		
		console.log(thiz.chartDef.chart.type);
		
		// pie chart
		if(thiz.chartDef.chart.type == "pie")
			{
			data = updateCallback();
			thiz.chart.series[0].setData(data,true);
			}
		
		// line chart , date time xaxis
		else if(thiz.chartDef.chart.type == "spline")
			{
			//console.log(thiz.chart);
			// need return two dementional array
			data = updateCallback();
			
			for(var i = 0 ; i < data.length ; i++)
				{
				    console.log(i);
				    console.log(data[i]);
				    if(data[i].length > 1)
					{
				    	var shift1 = thiz.chart.series[i].data.length > 20;
				    	thiz.chart.series[i].addPoint(data[i], false, shift1);
					}
					
				}			
//			var shift1 = thiz.chart.series[1-1].data.length > 20;
//			data1 = updateCallback();
//			var shift2 = thiz.chart.series[2-1].data.length > 20;
//			thiz.chart.series[1-1].addPoint(data, false, shift1);
//			thiz.chart.series[2-1].addPoint(data1, false, shift2);
			thiz.chart.redraw();
			}
		// else if , add more 

		//var a = this.startUpdate;
		setTimeout(function(){thiz.startUpdate(updateCallback);},thiz.updateInterval);
		//console.log("updated...");
	};
	
	return this;
}
