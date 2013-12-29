var step = 10000;
var title_symbols = document.querySelector(".title--symbols");

print_select();

print_symbols ( 0, step, "page" );
var text = "0  - " + num_readable( step );
title_symbols.innerHTML = text;

add_action_to_rangelist ()


function num_to_hex ( num ){
    return num.toString(16);
}

function hex_to_num ( hex ){
    return parseInt(hex, 16);
}

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

    options = "Диапазон: <select id=\"range_select\">" + options + "</select>"; //onchange=\"print_symbols()\"

    placeOutput.innerHTML = options;

    var myselect = document.getElementById("range_select");
    myselect.addEventListener('change', function() {
            var select_val = this.options[this.selectedIndex].value;
            var max = +select_val;
            var min = max - step + 1;
            var text = num_readable( min ) + " - " + num_readable( max );

            title_symbols.innerHTML = text;
            print_symbols ( min, max );
            remove_current();
            }, false);

}

function print_symbols ( min, max, context ) {
    var out = "";

    var placeOutput = document.getElementById("symbols");
    placeOutput.innerHTML = "Загрузка";

    min = min || max - step + 1;

    out += "<ul class=\"list--entities\">";

    for ( var i = min; i <= max; i++ ){
    	var char_i = String.fromCharCode(i);

        out += "<li><code><i class=\"num\">&amp;#" + i + "</i>";
        out += "<i class=\"hex\">\\" + num_to_hex( i ) + "</i></code>";
        out += "<span>"  + String.fromCharCode(i) + "</span></li>\n"; 

    	out += ( i < max 
                 && i > 0 
                 && i % 1000 == 0 ) ? "</ul>\n<h2>" + i + "</h2><ul class=\"list--entities\">" : "";
    }

    out += "</ul>";

    placeOutput.innerHTML = out;

}

function remove_current() {
    var current_item = document.querySelector(".current");

    if ( current_item ) {
        current_item.classList.remove('current');
        }
}

function add_action_to_rangelist () {
    var separator = ".."
    var list_items = document.querySelectorAll(".list--blocks LI");
    
    for ( var i = 0; i < list_items.length; i++ ){
        var item = list_items[i];

        item.addEventListener('click', function() {
            var range = this.getAttribute('data-range').split(separator);
            var min = hex_to_num( range[0] );
            var max = hex_to_num( range[1] );
            var text = this.textContent;

            print_symbols ( min, max, "range" );
            title_symbols.innerHTML = text;
            remove_current();
            this.classList.add('current');
            }, false);
    }
}
