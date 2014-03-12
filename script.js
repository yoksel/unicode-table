var separator = "..";
var step = 10000;
var title_symbols = document.querySelector(".title--symbols");
var context = "";
var fonts = ["Arial", "Arial Unicode MS", "Courier New", "Georgia", "Tahoma", "Times", "Trebuchet", "Verdana"];
var default_title = "Полезные символы<span>Моя подборка</span>";

initial();

function print_symbols ( min, max ) {

    var out = "";
    var placeOutput = document.getElementById("symbols");
    placeOutput.innerHTML = "Загрузка";

    out += "<ul class=\"list--entities\">";

    if ( max > 0 ){
        min = ( min >= 0 ) ? min : max - step + 1;
        for ( var i = min; i <= max; i++ ){
        	
            out += get_symbol (i, max);
        }
    }
    else {
        for( var k = 0; k < useful.length; k++ ){
            out += get_symbol (useful[k], max);
        }
    }

    out += "</ul>";

    placeOutput.innerHTML = out;

    add_action_to_symbols_list();
}


function change_data ( data_range, text ) {

    var range = get_range_from_string ( data_range );
    var min = range[0];
    var max = range[1];

    print_symbols ( min, max );
    title_symbols.innerHTML = text + "<span>" + data_range + "</span>";
    change_href ( data_range, text );
    remove_class("current");
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

    var start = 1;

    if ( hash.indexOf("..") < 0 ){
        data_range = hash_arr[0] + " " + hash_arr[1];
        start = 2;
        }

    for ( var i = start; i < hash_arr.length; i++ ){
        text += hash_arr[i];
        if ( i < hash_arr.length - 1 ) {
            text += " ";
            }
        }
    
    change_data ( data_range, text );
}

function add_action_to_symbols_list () {
    var chars = document.querySelectorAll(".show-case");
    var class_name = "full-width";

    for ( var i = 0; i < chars.length; i++ ){
        var chars_item = chars[i];
        
        chars_item.addEventListener ('click', function() {

            var parent = this.parentNode;
            var parent_class = parent.classList;
            var text = this.textContent;

            if ( !parent_class.contains( class_name )){
                close_show_case ();
                parent.classList.add( class_name );
                this.innerHTML = create_fonts_list ( text );
                }
        });
    }

}

function create_fonts_list ( char_item ) {
    var show_case_content = "";

    for ( var k = 0; k < fonts.length; k++ ) {
        var font = fonts[k];
        var font_class = font.toLowerCase(font);
        font_class = "f-" + string_to_class ( font_class );
        
        show_case_content += "<li class=\"font-item " + font_class + "\" data-name=\"" + font + "\">";
        show_case_content += "<span class=\"font-name\">" + font + "</span>";
        show_case_content += "<span class=\"font-demo\">" + char_item + "</span>";
        show_case_content += "</li>";
        }

    return show_case_content;  
}

function add_action_to_close () {
    
    var elems = document.querySelectorAll(".close");

    for ( var i = 0; i < elems.length; i++ ){
        elems[i].addEventListener ("click", function() {
            close_show_case ();
            });
    }
}

function close_show_case () {

    var class_name = "full-width";
    var show_case = document.querySelector(".full-width .show-case");
    
    if ( show_case ){
        var show_case_content = show_case.getAttribute("data-char");
        show_case.innerHTML = show_case_content;
        remove_class ( class_name );
        }
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

    if ( document.location.hash != "" ){
        show_range_for_url();
        }
    else {
        print_symbols ( 0, 0 );
        title_symbols.innerHTML = default_title;
        }

    add_action_to_range_select();    
    add_action_to_range_list();
    add_action_to_close ();
}

function get_symbol( i, max ) {
    var out = "";
    var char_i = String.fromCharCode(i);

    out += "<li class=\"item--entities\"><code><i class=\"num\">&amp;#" + i + "</i>";
    out += "<i class=\"hex\">\\" + num_to_hex(i) + "</i></code>";
    out += "<ul class=\"show-case\" data-char=\"" + char_i + "\"><li>"  + char_i + "</li></ul>";
    out += "<span class=\"close\"></span>"; 
    out += "</li>\n"; 

    if ( i < max 
             && i > 0 
             && i % 1000 == 0 
             && context == "page" ) {
                out += "</ul>\n";
                out += "<h2>" + i + "</h2>";
                out += "<ul class=\"list--entities\">";
            }

    return out;
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

function remove_class ( class_name ) {

    var current_item = document.querySelector("." + class_name);

    if ( current_item ) {
        current_item.classList.remove( class_name );
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

function string_to_class ( str ) {
    var replace = / /gi;
    return str.replace( replace, "-");
}
