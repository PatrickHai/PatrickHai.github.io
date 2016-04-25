var drawBarChart = function(data, chart_id, color){
    var parentWidth = $('#'+chart_id).parent().width();
    var parentHeight = $('#'+chart_id).parent().height();
    var margin = {
      top: parentHeight*0.3, 
      right: parentWidth*0.02, 
      bottom: parentHeight*0.02, 
      left: parentWidth*0.02
    },
    width = parentWidth - margin.left - margin.right,
    height = parentHeight - margin.top - margin.bottom;

    var formatPercent = d3.format(".0%");

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(formatPercent);

    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<strong>"+d.xValue+":</strong> <span style='color:red'>" + d.yValue + "</span>";
      })

    var svg = d3.select('#'+chart_id)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.call(tip);

    x.domain(data.map(function(d) { return d.xValue; }));
    y.domain([0, d3.max(data, function(d) { return d.yValue; })]);

    var bars = svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        .attr("y",function(d,i){ return height; })
        .attr("fill","#4985EA")
        .attr("height",0)
        .transition()
        .duration(2000)
        .ease("bounce")
        .delay(function(d,i){
            return i * 200;
        })
        .attr("x", function(d) { return x(d.xValue); })
        .attr("y", function(d) { return y(d.yValue) })
        .attr("width", x.rangeBand())
        .attr("height", function(d) { return height - y(d.yValue); })
        .attr("fill",color)
        .attr("class", "bar");

    function type(d) {
      d.yValue = +d.yValue;
      return d;
    }


    d3.select("#sortBar").on("change", change);


    function change(){
      // Copy-on-write since tweens are evaluated after a delay.
      var x0 = x.domain(data.sort(this.checked
          ? function(a, b) { return b.value - a.value; }
          : function(a, b) { return d3.ascending(a.xValue, b.xValue); })
          .map(function(d) { return d.xValue; })).copy();

      svg.selectAll(".bar")
          .sort(function(a, b) { return x0(a.xValue) - x0(b.xValue); });

      var transition = svg.transition().duration(750),
          delay = function(d, i) { return i * 50; };

      transition.selectAll(".bar")
          .delay(delay)
          .attr("x", function(d) { return x0(d.xValue); });

      transition.select(".x.axis")
          .call(xAxis)
          .selectAll("g")
          .delay(delay);
    }
}