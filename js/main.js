function fetchData() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     plot(this.responseText);
    }
  };
  xhttp.open("GET", "https://api-tcc-rtfs.herokuapp.com/comments", true);
  xhttp.send();
}

function plot(data) {

  var dataObj = JSON.parse(data);
  var love = [];
  var wtv = [];
  var hate = [];

  dataObj.forEach(element => {

    let comment = element.guestComment
    
    switch(comment) {
      case "LOVING": love.push(comment); break;
      case "WHATEVER": wtv.push(comment); break;
      case "HATING": hate.push(comment); break;
      default: break;
    }  
  });
  
  pieChart(love, wtv, hate);
}

function scatterChart(x, y, z) {

  var Loving = {
    x: x,
    type: 'scatter'
  };
  var Whatever = {
    x: y,
    type: 'scatter'
  };
  var Hating = {
    x: z,
    type: 'scatter'
  }
  var data = [Loving, Whatever, Hating];

  var layout1 = {
    yaxis: {rangemode: 'tozero',
            showline: true,
            zeroline: true}
  };

  var layout2 = {
    yaxis: {rangemode: 'tozero',
            zeroline: true}
  };

  Plotly.newPlot('chart', data, layout1);
}

function pieChart(x, y, z) {

  var colors = ['#4CAF50', '#FFC107', '#FF5722'];

  var data = [{
    values: [x.length, y.length, z.length],
    labels: ['Loving', 'Whatever', 'Hating'],
    marker: {
      colors: colors,
    },
    type: 'pie'
  }];
  
  var layout = {
    height: 400,
    width: 500
  };
  
  Plotly.newPlot('chart', data, layout);
}