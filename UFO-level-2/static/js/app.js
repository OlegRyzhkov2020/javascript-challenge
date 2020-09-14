// from data.js
var tableData = data;
var tbody = d3.select("tbody");

// Select the button
var button = d3.select("#filter-btn");

// Select the form
var form = d3.select("#form");

// Create event handlers
button.on("click", runEnter);
form.on("submit",runEnter);

// Complete the event handler function for the form
function runEnter() {

  // Prevent the page from refreshing
  //d3.event.preventDefault();
  //Exploring number of unique variables in dataset
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
        let str = tableData[i].durationMinutes;

        var validateString = (str) => {
          str=str.toString();
          var numbers = str.replace(/[^0-9]/g,'');


          if (numbers === null) {
            return 0;
          }
        return parseInt(numbers);
        }
        duration_list[tableData[i].durationMinutes] = validateString(str);
  }
  console.log(state_list);
  console.log(shape_list);
  console.log(duration_list);
  
  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#datetime");

  // Get the value property of the input element
  var inputValue = inputElement.property("value");
  if (!inputValue) {
    inputValue = "1/1/2010";
  };

  var filteredData = tableData.filter(record => record.datetime === inputValue);

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

window.addEventListener("DOMContentLoaded", function () {
  runEnter()
});
