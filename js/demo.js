

//step1: init highcharts

//step2: http request function, update pie data in callback, set line data in global vars

//step3: loop http request function( update pie chart)

//step4: loop line chart upate

//setTimeout();

//global vars




var twoline;
var openedpie;
var tobeclosedpie;
var prioritychart;


$(document).ready(function(){

Highcharts.setOptions({
	global: {
		useUTC: false
	}
});

// init the two line chart
twoline = new highchartjsLHWrapper({
        chart: {
	    renderTo: 'line',
            type: 'spline'
        },
        title: {
            text: '未解决Bug - 已解决待关闭Bug'
        },

        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
        },
        yAxis: {
            title: {
                text: 'Bug数量'
            },
            min: 0
        },
        tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 0);
                }
        },

        plotOptions: {
            spline: {
                marker: {
                    enabled: true
                }
            }
        },

        series: [{
            name: '未解决问题',
            color: 'red',
            data: [
            ]
        }, {
            name: '已解决待关闭问题',
            color: 'green',
            data: [
            ]
        }
            ]
    },5000);



openedpie = new highchartjsLHWrapper(
{
            chart: {
		renderTo:"opened",
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: " "
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.2f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                    },
                    showInLegend: false
                }
            },
            series: [{
                name: 'Bug占比',
                colorByPoint: true,
                data:[]
            }]
        }
,5000);


tobeclosedpie = new highchartjsLHWrapper(
{
            chart: {
		renderTo:"tobeclosed",
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: " "
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.2f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                    },
                    showInLegend: false
                }
            },
            series: [{
                name: 'Bug占比',
                colorByPoint: true,
                data:[]
            }]
        },5000);


prioritychart = new priorityBoard(['Blocker','Critical','Major','Minor','Trivial'],5000);

console.log("=========");


openedpie.chart.setTitle({text:"未解决问题人员占比"});
tobeclosedpie.chart.setTitle({text:"待关闭问题人员占比"});


var openedFilterId = "11601";
var resolvedFilterId = "11599";

var filterArray=null
var searchurl = window.location.search ;
console.log(searchurl);

if(!(searchurl == null || searchurl== "")) 
filterArray=searchurl.slice(1,searchurl.length).split("=")[1].split(",");

console.log("====="+filterArray);

if(filterArray != null){
console.log("why?");
if(filterArray[0] != null && !isNaN(filterArray[0])) openedFilterId = filterArray[0];
if(filterArray[1] != null && !isNaN(filterArray[1])) resolvedFilterId = filterArray[1];
}

//console.log(filterArray[0]+filterArray[1]);
var openedTimer = updateopeneddata();
var closedTimer = updatetobecloseddata();

function updateopeneddata(){
var timer = 0;
var url="http://qa.heika.com/jira/rest/gadget/1.0/twodimensionalfilterstats/generate?filterId=filter-"+openedFilterId+"&xstattype=priorities&showTotals=true&sortDirection=desc&sortBy=total&ystattype=assignees&numberToShow=9999&_=1466666532480";
console.log(url);
updateChartFromJira(url,[openedpie,twoline,prioritychart],0,true);
timer = setTimeout(updateopeneddata,6000);
return timer;
}


function updatetobecloseddata(){
var timer = 0;
var url="http://qa.heika.com/jira/rest/gadget/1.0/twodimensionalfilterstats/generate?filterId=filter-"+resolvedFilterId+"&xstattype=priorities&showTotals=true&sortDirection=desc&sortBy=total&ystattype=assignees&numberToShow=9999&_=1466666532480";
console.log(url);
updateChartFromJira(url,[tobeclosedpie,twoline],1,false);
timer = setTimeout(updatetobecloseddata,6000);
return timer;
}

function stop(timer) {
  if (timer) {
            clearTimeout(timer);
            timer = 0;
  }
}

//if click ,then stop the timer
//

function updateChartFromJira(url,chart,lineseries,updatepri){

    console.log( "dashboard js loading" );

        $.get(url, function(data, status){
        var testdata = new jiraGadgetConverter();
        testdata.convert2highchartsData(data);

        if(chart!=null)
        {
        chart[0].updateOnce(testdata.piechartdata);
        var newdata=[];
        newdata[lineseries]=testdata.linepointdata;
	console.log("======="+testdata.linepointdata);
	console.log(newdata);
        chart[1].updateOnce(newdata); 
        console.log(testdata.prioritydata);
        if(updatepri) chart[2].updateOnce(testdata);
        }

        });
    
     }
    

}); // end of the $(document).ready()

