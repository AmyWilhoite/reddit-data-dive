$("#searchBtn").on("click", function(event) {
    event.preventDefault();
    //get the textbox value
    if($("#userData").val() ==="") {
        console.log( "type in something");
    }
    
})

$("#recentsearches").on("change", function() {
    alert("select changed");
})

// Event Listener for Text Highlight
//https://stackoverflow.com/questions/3731328/on-text-highlight-event

