//------------------------------------------------------------------------------
//Explore dataset
//------------------------------------------------------------------------------

var tableData = data;// from data.js
var state_list = [];
var shape_list = [];
var duration_list = {};
for (var i in tableData) {
  // Check if a sate value exists in the list
  if(state_list.indexOf(tableData[i].state) !== -1){}
  else{
      state_list.push(tableData[i].state);
      }
  // Check if a shape value exists in the list
  if(shape_list.indexOf(tableData[i].shape) !== -1){}
  else{
      shape_list.push(tableData[i].shape);
      }
  // Creating dictionary of duration numbers
  var str = tableData[i].durationMinutes;
      str = str.toString();
  let min = str.includes("min");
  let sec = str.includes("sec");
  let hour = str.includes("hour");

  var validateString = (str) => {
      var numbers = str.match(/^\d+|\d+\b|\d+(?=\w)/g);
      if (numbers === null) {
          return 0;
          }
      return parseInt(numbers);
      }
  var number = validateString(str);
  if (sec === true) { number = 1};
  if (hour === true) { number = 60};
  if (number === 0) {
    if (hour === true) { number = 60}
    else {number = 1};
  }
  duration_list[tableData[i].durationMinutes] = number;
}
console.log(state_list);
console.log(shape_list);
console.log(duration_list);

//------------------------------------------------------------------------------
//Data Cleaning and Transforming
//------------------------------------------------------------------------------
for (i in tableData) {
  tableData[i].city = capitalizeFirstLetter(tableData[i].city);
  tableData[i].shape = capitalizeFirstLetter(tableData[i].shape);
  tableData[i].state = tableData[i].state.toUpperCase();
  tableData[i].country = tableData[i].country.toUpperCase();
  tableData[i].durationMinutes = duration_list[tableData[i].durationMinutes];
}

console.log(tableData);

//------------------------------------------------------------------------------
// Select the required IDs to obtain the input information
//------------------------------------------------------------------------------

var form = d3.select("#form");
var button = d3.select("#filter-btn");

var tbody = d3.select("tbody"); // Select Table Body to Send Table Data

// Create event handlers
button.on("click", runEnter);
form.on("submit",runEnter);

//------------------------------------------------------------------------------
// Complete the event handler function for the form
//------------------------------------------------------------------------------
function runEnter() {

  // Select the event date input element and get the raw HTML node
  var inputDate = d3.select("#event_date").property("value");
  if (!inputDate) {
    inputDate = "1/1/2010";
  };

  // Select the event country input element and get the raw HTML node
  var inputCountry = d3.select("#event_country").property("value");
  if (!inputCountry) {
    inputCountry = "US";
  };

  // Select the event duration input element and get the raw HTML node
  var inputDuration = d3.select("#event_duration").property("value");
  if (!inputDuration) {
    inputDuration = 1;
  };

  // Select the entry input data
  var inputState = d3.select("#state").property("value");
  if (!inputState) {
    inputState = "all";
  };
  var inputCity = d3.select("#city").property("value");
  if (!inputCity) {
    inputCity = "all";
  };
  var inputShape = d3.select("#shape").property("value");
  if (!inputShape) {
    inputShape = "all";
  };

  var filterQuery = {
    datetime: inputDate, city: inputCity, state: inputState,
    country: inputCountry, shape: inputShape
  }

  var filteredData = tableData.filter(record =>
      record.datetime === filterQuery.datetime ||
      record.country === filterQuery.country
    );

  if (inputDuration != 1) {
      filteredData = filteredData.filter(record =>
          record.durationMinutes < inputDuration
        )
    };
    

  if (inputState != "all") {
      filteredData = filteredData.filter(record =>
          record.state === filterQuery.state
        );
    }
  if (inputCity != "all") {
      filteredData = filteredData.filter(record =>
          record.city === filterQuery.city
        );
    }
  if (inputShape != "all") {
      filteredData = filteredData.filter(record =>
          record.shape === filterQuery.shape
        );
    }
  console.log(filteredData);

  var labels = [];
  var labels_data = [];
  for (i in filteredData) {
    labels.push(filteredData[i].city);
    labels_data.push(filteredData[i].durationMinutes);}
  renderChart(labels_data, labels, inputDate);

  // remove any children from the tbody to
  tbody.html("");

  filteredData.forEach((record) => {
    var row = tbody.append("tr");
    Object.entries(record).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });
};

//------------------------------------------------------------------------------
// Functions and Start EventListner
//------------------------------------------------------------------------------
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

window.addEventListener("DOMContentLoaded", function () {
  runEnter();
});
