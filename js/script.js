
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    
    var $street = $('#street').val();
    var $city = $('#city').val();
    var fulladress = $street +", "+$city;
    
    $greeting.text("So you want to live at "+fulladress+"?");
    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load google streetview
    var googleUrl= "https://maps.googleapis.com/maps/api/streetview?size=600x400&location="+fulladress;
    
    $body.append('<img class="bgimg" src ="'+googleUrl+'">');
    
    
    
    //
    
    return false;
};

$('#form-container').submit(loadData);
