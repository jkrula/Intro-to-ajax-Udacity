
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

    // load google streetview background image:
    var googleUrl= "https://maps.googleapis.com/maps/api/streetview?size=600x400&location="+fulladress;
    
    $body.append('<img class="bgimg" src ="'+googleUrl+'">');
    
    
    
    //load New york times articles:
    
        //formatting the url
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?"+$.param({
        "api-key":"4e599e4a463a41f58935a1ed62745f83",
        "q":$city,
        "sort":"newest"});
    
    
    
    $.getJSON(url, function(data){
        var articles = data.response.docs;
        $.each(articles, function(index, article){
            $nytElem.append("<li class='article'><a href ='"+article.web_url+"'>"+article.headline.main+"</a><p>"+article.snippet+"</p></li>");
        });
        
    });
    
    // load wikipedia links:
    var errorTextGenerator = setTimeout(function(){
        $wikiElem.text("Failed to get wikipedia content");
    }, 8000);
    
    $.ajax({
        url:"https://en.wikipedia.org/w/api.php?action=opensearch&limit=10&search="+$city+"&callback=?",
        dataType:'jsonP',
        success: function(data){
            var wikiLinks = {}
            $.each(data[1], function(index, title){
                wikiLinks[title] = data[3][index]; 
                
            });
            $.each(wikiLinks, function(key, value){
                $wikiElem.append("<li><a href='"+value+"'>"+key+"</a></li>");
            });
            clearTimeout(errorTextGenerator);
        }
    });
    
    
    
    return false;
};

$('#form-container').submit(loadData);
