// https://codepen.io/dcode-software/pen/zYGOrzK
// https://www.kodingmadesimple.com/2016/07/display-json-data-in-html-table-using-jquery-ajax.html 
// https://www.codegrepper.com/code-examples/javascript/reset+form+after+ajax+submit+jquery 

function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    // Sort each row
    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });

    // Remove all existing TRs from the table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows);

    // Remember how the column is currently sorted
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc"));
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc);
}

document.querySelectorAll(".tableT #sorted").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");
        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
});

document.querySelectorAll(".phoneT #sorted").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");
        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
});


// Document should be loaded 
$(document).ready(function(){
    $("#reset-btn").click(function(e) {
    e.preventDefault(); // prevent actual form submit
    var form = $(this);
    var url = form.attr('action'); //get submit url [replace url here if desired]
    $.ajax({
         type: "GET",
         url: "https://wt.ops.labs.vu.nl/api22/638972a1/reset",
         dataType: 'json',
         data: form.serialize(), // serializes form input
         success: function(data){
             $(".tableT").empty();
         }
    });
    });

    //  GET request
    $.ajax({
        url: "https://wt.ops.labs.vu.nl/api22/638972a1",
        method: "GET",
        dataType: 'json',
        // The elements will be added to the row when the GET request is succeeded
        success: function(data) {          
            for (var i=0; i<data.length; i++) {
                var row = $('<tr><td>' +data[i].brand+ '</td><td>' +data[i].model+ '</td><td>' 
                    +data[i].os+ '</td><td>' +data[i].screensize+ '</td><td>' +data[i].img+ '</td></tr>');
                $('.tableT').append(row);
            }
        },
    }); 
});
