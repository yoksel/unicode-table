var step = 10000;

print_select();

print_symbols ( 10000 );

function num_readable( num ) {
    var num = num + "";
    return num.slice(-9, -6) + " " + num.slice(-6, -3) + " " + num.slice(-3);
}

function print_select(){

    var placeOutput = document.getElementById("wrapper--range-select");

    var options = "";
    var max = 100; //1112064; // http://ru.wikipedia.org/wiki/%D0%AE%D0%BD%D0%B8%D0%BA%D0%BE%D0%B4
    
    for ( var i = 0; i <= max; i++ ){
        var step_min = ( i > 0) ? i * step + 1 : i * step;
        var step_max = (i + 1) * step;
        var step_output = num_readable( step_min ) + " - " + num_readable( step_max );
        options += "<option value=\"" + step_max + "\">" + step_output + "</option>"
    }

    options = "Диапазон: <select id=\"range_select\" onchange=\"print_symbols()\">" + options + "</select>"; 

    placeOutput.innerHTML = options;

}

function print_symbols ( max ) {

    var placeOutput = document.getElementById("symbols");
    placeOutput.innerHTML = "Загрузка";

    var myselect = document.getElementById("range_select");
    var select_val = myselect.options[myselect.selectedIndex].value;

    
    max = max || select_val;

    var out = "";
    var min = max - step + 1;
    
    out += "<ul>";

    for ( var i = min; i <= max; i++ ){
    	var char_i = String.fromCharCode(i);
        out += ( char_i != ""  ) ? "<li data-num=\"" + i + "\"><span>"  + String.fromCharCode(i) + "</span></li>\n" : ""; 
    	out += ( i > 0 && i % 1000 == 0 ) ? "</ul>\n<ul>" : "";
    }

    out += "</ul>";

    placeOutput.innerHTML = out;

}
