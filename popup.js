// document.addEventListener('DOMContentLoaded', function() {
//   var checkPageButton = document.getElementById('checkPage');
//   checkPageButton.addEventListener('click', function() {

//     chrome.tabs.getSelected(null, function(tab) {
//       d = document;

//       var f = d.createElement('form');
//       f.action = 'http://gtmetrix.com/analyze.html?bm';
//       f.method = 'post';
//       var i = d.createElement('input');
//       i.type = 'hidden';
//       i.name = 'url';
//       i.value = tab.url;
//       f.appendChild(i);
//       d.body.appendChild(f);
//       f.submit();
//     });
//   }, false);
// }, false);


window.onload = function(){
  chrome.tabs.getSelected(null,function(tab) {
    window.processTabUrl(tab.url);
  });
};

window.processTabUrl = function(tabUrl) {
  var query = tabUrl;
  var parser = new QueryStringParser();
  var values = parser.getValues(query);
  var itemsFound = false;

  if(values!==null){
    var table = document.getElementById("query-values");
    for(var name in values){
      itemsFound = true;
      var row = document.createElement("tr");
      var colName = document.createElement("td");
      var colValue = document.createElement("td");

      colName.innerHTML = name;
      colValue.innerHTML = values[name] || "&nbsp;";

      row.appendChild(colName);
      row.appendChild(colValue);
      table.appendChild(row);
    }
  }

  var elementToShow = (itemsFound) ? 
    document.getElementById("scrollable") :
    document.getElementById("message");

  elementToShow.className += " show";
};