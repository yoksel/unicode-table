var separator = "..";
var step = 10000;
var title_symbols = document.querySelector(".title--symbols");
var context = "";


initial();

function print_symbols ( min, max ) {

    var out = "";
    var placeOutput = document.getElementById("symbols");
    placeOutput.innerHTML = "Загрузка";

    min = ( min >= 0 ) ? min : max - step + 1;

    out += "<ul class=\"list--entities\">";

    for ( var i = min; i <= max; i++ ){
    	var char_i = String.fromCharCode(i);

        out += "<li><code><i class=\"num\">&amp;#" + i + "</i>";
        out += "<i class=\"hex\">\\" + num_to_hex(i) + "</i></code>";
        out += "<span>"  + char_i + "</span>";
        out += "</li>\n"; 

        if ( i < max 
                 && i > 0 
                 && i % 1000 == 0 ) {
            if ( context == "page" ){    
                out += "</ul>\n";
                out += "<h2>" + i + "</h2>";
                out += "<ul class=\"list--entities\">";
                }
        }
    }

    out += "</ul>";

    placeOutput.innerHTML = out;
}

function change_data ( data_range, text ) {

    var range = get_range_from_string ( data_range );
    var min = range[0];
    var max = range[1];

    print_symbols ( min, max );
    title_symbols.innerHTML = text + "<span>" + data_range + "</span>";
    change_href ( data_range, text );
    remove_current();
    highlight_current ( data_range );
}

function add_action_to_range_select () {

    var select = document.querySelector(".select--blocks");

    select.addEventListener('change', function() {
        var elem = this.options[this.selectedIndex];
        var data_range = elem.value;
        var text = elem.text;
        context = "select";
        
        change_data ( data_range, text );
    });

}

function show_range_for_elem ( elem ){
    
    var data_range = elem.getAttribute('data-range');
    var text = elem.textContent;
    context = "list";
    
    change_data ( data_range, text );
    elem.classList.add('current');
    
}

function add_action_to_range_list () {

    var list_items = document.querySelectorAll(".list--blocks LI");
    
    for ( var i = 0; i < list_items.length; i++ ){
        var item = list_items[i];

        item.addEventListener('click', function() {
            show_range_for_elem ( this );
            }, false);
    }
}

function show_range_for_url () {

    var text = "";
    context = "href";
    var hash = document.location.hash.substr(1);
    var hash_arr = hash.split(" ");
    var data_range = hash_arr[0];

    for ( var i = 1; i < hash_arr.length; i++ ){
        text += hash_arr[i] + " ";
        }
    
    change_data ( data_range, text );
}

//___________ Common ___________

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

function initial() {

    var text = "";

    if ( document.location.hash != "" ){
        show_range_for_url();
        }
    else {
        print_symbols ( 0, step, "page" );
        text = "0  - " + num_readable( step );
        title_symbols.innerHTML = text;
        }

    add_action_to_range_select();    
    add_action_to_range_list();
}

function highlight_current_list_item ( data_range ) {
    var list_items = document.querySelectorAll(".list--blocks LI");

    for (var i = 0; i < list_items.length; i++ ){
        var elem = list_items[i];
        var data_range_attr = elem.getAttribute("data-range");

        if ( data_range_attr == data_range ) {
            elem.classList.add("current");
            }
        }
}
function highlight_current_option ( data_range ) {
    var list_items = document.querySelectorAll(".select--blocks option");

    for (var i = 0; i < list_items.length; i++ ){
        var elem = list_items[i];
        var data_range_attr = elem.value;

        if ( data_range_attr == data_range ) {
            elem.selected = true;
            }
        }
}

function highlight_current( data_range ) {
    if ( context != "list") {
        highlight_current_list_item ( data_range );
        }
    if ( context != "select" ){
        highlight_current_option ( data_range );
        }    
}

function remove_current () {

    var current_item = document.querySelector(".current");

    if ( current_item ) {
        current_item.classList.remove("current");
        }
}

function change_href ( data_range, text ) {

    var current_href = document.location.href; 
    var href_arr = current_href.split("#");

    document.location.href = href_arr[0] + "#" + data_range + " " + text; 
}

function get_range_from_string ( data_range ) {
    
    var range = data_range.split(separator);
    var min = hex_to_num( range[0] );
    var max = hex_to_num( range[1] );
    return [ min, max ];
}
