function renderChart(data, labels, chart_type='line') {
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: chart_type,
    data: {
      labels: labels,
      datasets: [{
        label: 'WTI price',
        data: data,
        backgroundColor:
        'rgba(153, 102, 255, 0.2)',
        borderColor:
        'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
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
