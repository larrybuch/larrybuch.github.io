window.onload = function() { init(); };

var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?key=0ApL2ZVhpOmONdDVqZ2lQb0UxbUs0YW1MXzV2N19uaFE&output=html';

function init() {
  Tabletop.init( { key: public_spreadsheet_url,
                   callback: showInfo,
                   simpleSheet: true } );
}

function showInfo(data, tabletop) {
  console.log(data);
  visualizeIt(data);
}

function visualizeIt(data){
  var wrapper = d3.select("#the-goods .second");

  // refactor this so rows are being wrapped in links, not the other way around
  var links = wrapper.selectAll(".link")
    .data(data)
    .enter()
    .append("a")
    .attr("href", function(d){ return d.url; })
    .attr("target", "_blank");

  var rows = links.append("div")
    .attr("class", function(d){ return d.tag + " row"; })
    .text(function(d){ return d.headline; });

  var wit = rows.append("span")
    .text(function(d){if (d.wit) {return " with " + d.wit;} });

}

