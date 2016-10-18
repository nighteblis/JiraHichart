# JiraHichart
Dynamic Hichart chart which data are loaded from Jira issue tracker system.


#Note:

1. js/lhchart.js  this file is the hicharts.js (I renamed it) , you could replace this with the latest hicharts.js or directly change the javascript url location in the html.
2. js/jiraconverter.js  convert the jira issue data to data object.
3. js/highchartjsLHWrapper.js wrapper of the hicharts ,  and add the update data implementation in it.
4. js/demo.js draw 4 charts in html. 

# How to try

1. Install these files in your http web directory.
2. Modify the js/demo.js to  change jiraHttpDomain to your actual jira http server domain.
3. Access http://yourdomain.com/index.html?filter=11701,11599

Filter is your jira filter.  11701 is the filter of the opened issues,  11599 is the filter of the resolved issues but not closed. You need create your filter before doing this.
