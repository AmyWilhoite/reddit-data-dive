$("#searchBtn").on("click", function (event) {
    event.preventDefault();
    //get the textbox value
    if ($("#userData").val() === "") {
        console.log("type in something");
    } else {
        searchOnWikipedia($("#userData").val());
        searchOnTwitter($("#userData").val());
    }

})

function searchOnWikipedia(term) {
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
    Object.keys(params).forEach(function (key) { url += "&" + key + "=" + params[key]; });

    fetch(url)
        .then(function (response) { return response.json(); })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) { console.log(error); });
}

$("#recentsearches").on("change", function () {
    alert("select changed");
})

// Event Listener for Text Highlight
//https://stackoverflow.com/questions/3731328/on-text-highlight-event

// Twitter Search Function
function searchOnTwitter() {
    let requestUrl = `https://api.twitter.com/2/tweets/20`;
    fetch(requestUrl, {
        method: "GET", 
        headers: { "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAAGFDZAEAAAAAhkSVV8tv2CtCy5Fg92bFLzPKwX4%3D2glHC2Al0MR9iDDQH4PJpF9G9ozeVjq9ApPTfoTVb64MmN5xSa" } 
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                return;
            }
        })
        .then(function (data) {
            if (!data) {
                alert("We ran into some issues, please contact the developer at zhangxuyang.chn@gmail.com");
            } else {
                console.log(data);
            }
        })
}

// fetch('https://api.github.com/users/manishmshiva', {
//     method: "GET",
//     headers: { "Content-type": "application/json;charset=UTF-8" }
// })