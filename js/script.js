window.onload = function() { init(); };

var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?key=0ApL2ZVhpOmONdDVqZ2lQb0UxbUs0YW1MXzV2N19uaFE&output=html';
var nestedData;

function init() {
  Tabletop.init( { key: public_spreadsheet_url,
                   callback: showInfo,
                   simpleSheet: true } );
}

function showInfo(data, tabletop) {
  visualizeIt(data);
}

function visualizeIt(data){
  // var wrapper = d3.select("#the-goods .second");

  // // refactor this so rows are being wrapped in links, not the other way around
  // var links = wrapper.selectAll(".link")
  //   .data(data)
  //   .enter()
  //   .append("a")
  //   .attr("href", function(d){ return d.url; })
  //   .attr("target", "_blank");

  // var rows = links.append("div")
  //   .attr("class", function(d){ return d.tag + " row"; })
  //   .text(function(d){ return d.headline; });

  // var wit = rows.append("span")
  //   .text(function(d){if (d.wit) {return " with " + d.wit;} });

  nestedData = d3.nest()
    .key(function(d){ return d.tag; })
    .entries(data);

  // trying a second thing
  var wrap = d3.select("body");

  var sections = wrap.selectAll(".test")
    .data(nestedData)
    .enter()
    .append("section")
    .attr("class", "chunk")
    .attr("id", function(d){ return d.key.replace(/\s+/g, '-').toLowerCase(); });

  var sectionTitle = sections.append("div")
    .attr("class", "first")
    .text(function(d){ return d.key; });

  var secondSection = sections.append("div")
    .attr("class", "second");

  var links = secondSection.selectAll(".link")
    .data(function(d){ return d.values; })
    .enter()
    .append("a")
    .attr("href", function(d){ return d.url; })
    .attr("target", "_blank");

  var rows = links.append("div")
    .attr("class", function(d){ return d.tag + " row"; })
    .text(function(d){ return d.headline; });

  var wit = rows.append("span")
    .text(function(d){if (d.wit) {return " with " + d.wit;} });

  console.log(nestedData);

  // var body = d3.select('body')
  //   .append("section")
  //   .attr("id", "")

}

