var w = 600;
var h = 300;
var padding = 20;

var dataset = [];
var maxValue = 50;

for (var i = 0; i < 25; i++) {
  var pointX = Math.random() * maxValue;
  var pointY = Math.random() * maxValue;
  dataset.push({key: i, xpos: pointX, ypos: pointY});
}

var xScale = d3.scaleLinear()
               .domain([0, d3.max(dataset, function(d) {return d.xpos;})])
               .range([padding, w - 2*padding]);

var yScale = d3.scaleLinear()
               .domain([0, d3.max(dataset, function(d) {return d.ypos})])
               .range([h - padding, padding]);

var xAxis = d3.axisBottom()
              .scale(xScale)
              .ticks(6);

var yAxis = d3.axisLeft()
              .scale(yScale)
              .ticks(5);

var svg = d3.select("#databox")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

svg.append("clipPath")
   .attr("id", "chart-area")
   .append("rect")
   .attr("x", padding)
   .attr("y", padding)
   .attr("width", w - 3*padding)
   .attr("height", h - 2*padding)

svg.append("g")
   .attr("id", "circles")
   .attr("clip-path","url(#chart-area)")
   .selectAll("circle")
   .data(dataset, function(d) {
     return d.key;
   })
   .enter()
   .append("circle")
   .attr("cx", function(d) {
       return xScale(d.xpos);
   })
   .attr("cy", function(d) {
       return yScale(d.ypos);
   })
   .attr("r", 3);

svg.append("g")
   .attr("class", "x axis")
   .attr("transform", "translate(0," + (h - padding) + ")")
   .call(xAxis);

svg.append("g")
   .attr("class", "y axis")
   .attr("transform", "translate(" + padding + ",0)")
   .call(yAxis);

d3.selectAll("#databox button")
    .on("click", function() {
      var transitionTime = 500;
      var buttonID = d3.select(this).attr("id");
      var npoints = parseFloat(d3.select("#npoints").property("value"));
      if (!Number.isInteger(npoints) || npoints <= 0) {
        alert("Please enter a positive integer number of points");
        return;
      }
      if (buttonID == "addpoints") {
		if (npoints > 100) {
		  alert("C'mon");
          alert("That's a lot of points");
          return;
		}
        var maxvalue = parseFloat(d3.select("#maxvalue").property("value"));
        var maxkey = d3.max(dataset, function(d) {return d.key;});
        if (isNaN(maxvalue) || maxvalue <= 0) {
          alert("Please enter a positive number as a maximum");
          return;
        }
        for (var i = maxkey + 1; i < maxkey + npoints + 1; i++) {
          var pointX = Math.random() * maxvalue;
          var pointY = Math.random() * maxvalue;
          dataset.push({key: i, xpos: pointX, ypos: pointY});
        }
      } else {
        if (npoints >= dataset.length) {
          alert("You're taking away too many points");
          return;
        }
        for (var j = 0; j < npoints; j++) {
          dataset.splice(Math.floor(Math.random() * dataset.length), 1);
        }
      }
      xScale.domain([0, d3.max(dataset, function(d) {return d.xpos;})]);
      yScale.domain([0, d3.max(dataset, function(d) {return d.ypos;})]);

      var circles = svg.select("#circles")
                       .selectAll("circle")
                       .data(dataset, function(d) {return d.key;});

      circles.enter()
             .append("circle")
             .attr("cx", function(d) {
                 return xScale(0);
             })
             .attr("cy", function(d) {
                 return yScale(0);
             })
             .attr("r", 3)
             .merge(circles)
             .transition()
             .duration(transitionTime)
             .attr("cx", function(d) {
                 return xScale(d.xpos);
             })
             .attr("cy", function(d) {
                 return yScale(d.ypos);
             })

      circles.exit()
             .transition()
             .duration(transitionTime)
             .attr("cx", w-2*padding)
             .attr("cy", padding)
             .remove()

      svg.select(".x.axis")
         .transition()
         .duration(transitionTime)
         .call(xAxis);

      svg.select(".y.axis")
         .transition()
         .duration(transitionTime)
         .call(yAxis);
    })
