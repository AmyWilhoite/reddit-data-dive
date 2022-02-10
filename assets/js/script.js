$("#searchBtn").on("click", function(event) {
    event.preventDefault();
    //get the textbox value
    if($("#userData").val() ==="") {
        console.log( "type in something");
    } else { 
        searchOnWikipedia ($("#userData").val());
    }
    
})

function searchOnWikipedia (term) {
   /*

*/

var url = "https://en.wikipedia.org/w/api.php"; 

var params = {
    action: "query",
    list: "search",
    srsearch: term,
    srlimit: 1,
    srprop: "snippet",
    format: "json"
};

url = url + "?origin=*";
Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

fetch(url)
    .then(function(response){return response.json();})
    .then(function(response) {
    console.log(response);
    })
    .catch(function(error){console.log(error);});
}

$("#recentsearches").on("change", function() {
    alert("select changed");
})

// Event Listener for Text Highlight
//https://stackoverflow.com/questions/3731328/on-text-highlight-event

