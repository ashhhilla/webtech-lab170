function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });

    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    tBody.append(...sortedRows);

    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc);
}

document.querySelectorAll(".tableT th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
       const currentIsAscending = headerCell.classList.contains("th-sort-asc");
        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
});

document.querySelectorAll(".PhoneT th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
       const currentIsAscending = headerCell.classList.contains("th-sort-asc");
        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
});

// Dynamic Table Function
$(document).ready(function(){
    //Reset Button Function, when the reset button is clicked, back to the original state
    $("#resetbtn").click(function() {
    // styling the reset button 
    $("#resetbtn").css("background", "blue").css("color", "white"); // prevent actual form submit
    var form = $(this);
    // GET Request the data
    $.ajax({
         type: "GET",
         url: "https://wt.ops.labs.vu.nl/api22/638972a1/reset",
         dataType: 'json',
         data: form.serialize(), 
         // If it succeed, empty the data on the table
         success: function(){
             $("tableT").empty();
         }
    });
    });

    //  GET request 
    $.ajax({
        url: "https://wt.ops.labs.vu.nl/api22/638972a1",
        method: "GET",
        dataType: 'json',
        // The elements will be added to the table the GET request is succeeded
        success: function(data) {
            for (var i=0; i<data.length; i++) {
                var row = $('<tr><td>' +data[i].brand+ '</td><td>' +data[i].model+ '</td><td>' +data[i].os+ '</td><td>' +data[i].screensize+ '</td><td>' +data[i].image+ '</td></tr>');
                $('tableT').append(row);
            }
        },

        // Displays an error when the GET request is not succeeded
        error: function(jqXHR, textStatus, errorThrown){
            alert('Error: ' + textStatus + ' - ' + errorThrown);
        }
    }); 

    // add data without reloading the pages
    $("#add_details").click("add", function (e) {
        $.ajax({
          type: "POST",
          url: "https://wt.ops.labs.vu.nl/api22/638972a1",
          data: "json",
          success: function () {
          }
        });
        e.preventDefault(); // Shows data without reloads the page manually
    });
    
});
