function renderChart(data, labels, label_name = 'All cities', chart_type='line') {
  console.log(data);
  console.log(labels);
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: chart_type,
    data: {
      labels: labels,
      datasets: [{
        label: ("Event duration (minutes) across cities, date:"+ label_name),
        data: data,
        backgroundColor:
        'rgba(153, 102, 255, 0.2)',
        borderColor:
        'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }]
    },
    options: {
      legend: {
                labels: {
                    fontColor: "#CCC",
                    fontSize: 16
                }
            },
      scales: {
        xAxes: [{ color: 'rgba(153, 102, 255, 1)',
          ticks: { fontColor: "#CCC",}}],
        yAxes: [{ color: 'rgba(153, 102, 255, 1)',
          ticks: { fontColor: "#CCC",
            beginAtZero: false,
            callback: function(value, index, values) {
                            return value;
                          }
          }
        }]
      }
    }
  });
}
