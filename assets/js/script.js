let keywordsArray = [];

$("#searchBtn").on("click", function (event) {
    event.preventDefault();
    //get the textbox value
    if ($("#userData").val() === "") {
        console.log("type in something");
    } else {
        // searchOnWikipedia($("#userData").val());
        searchOnReddit($("#userData").val());
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

// Reddit Search Function
function searchOnReddit(keyword) {
    let requestUrl = `https://www.reddit.com/r/subreddit/search.json?q=${keyword}&sort=hot&t=week&limit=3&restrict_sr=false`;
    fetch(requestUrl)
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
                renderRedditSearchResults(data);
            }
        })
}


// Render Reddit Search Results
function renderRedditSearchResults(jsonresponse) {
    $("#redditpostcontainer").empty();
    for (let i = 0; i < jsonresponse.data.children.length; i++) {
        $("#redditpostcontainer").append(
            `<div class="card" style="width: 18rem;">
    <div class="card-body d-flex row justify-content-between mt-0 pb-0">
      <span class="card-text reddit-post-sr">${jsonresponse.data.children[i].data.subreddit_name_prefixed}</span>
      <span class="card-text reddit-post-author"> Posted by u/${jsonresponse.data.children[i].data.author}</span>
      <span class="card-text reddit-post-time"> on ${moment.unix(jsonresponse.data.children[i].data.created).format("MM/DD/YYYY")}</span>
    </div>
    <div class="card-body pt-0">
      <h5 class="card-title reddit-post-title ">${jsonresponse.data.children[i].data.title}</h5>
      <img src="${returnPreviewImage(jsonresponse.data.children[i])}" class="card-img-top" alt="...">
      <p class="card-text reddit-post-text">${jsonresponse.data.children[i].data.selftext_html || ""}</p>
    </div>
    <div class="container d-flex row justify-content-between">
      <span class="commentcount"><i class="fas fa-comment-dots"></i> ${jsonresponse.data.children[i].data.num_comments}</span>
      <span class="upcount"><i class="fas fa-arrow-alt-circle-up"></i> ${jsonresponse.data.children[i].data.ups}</span>
      <span class="downcount"><i class="fas fa-arrow-alt-circle-down"></i> ${jsonresponse.data.children[i].data.downs}</span>
    </div>`
        )
    }
}

// check preview image
function returnPreviewImage (child) {
    if (!child.data.preview) {
        return "https://play-lh.googleusercontent.com/MDRjKWEIHO9cGiWt-tlvOGpAP3x14_89jwAT-nQTS6Fra-gxfakizwJ3NHBTClNGYK4"
    } else {
        return child.data.preview.images[0].resolutions[1].url;
    }
}

// save to localstorage
function saveKeywords(keywords) {
    // const exists = Boolean(keywordsArray.find(x => keywords));
    keywordsArray.unshift(keywords);
    localStorage.setItem("KeywordsArray", JSON.stringify(keywordsArray));
}

// read from localstorage
function getKeywords() {
    keywordsArray = localStorage.getItem("KeywordsArray") || [];
}

// Render keywords on screen


// fetch('https://api.github.com/users/manishmshiva', {
//     method: "GET",
//     headers: { "Content-type": "application/json;charset=UTF-8" }
// })

//  {
//     method: "GET", 
//     headers: { "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAAGFDZAEAAAAAhkSVV8tv2CtCy5Fg92bFLzPKwX4%3D2glHC2Al0MR9iDDQH4PJpF9G9ozeVjq9ApPTfoTVb64MmN5xSa" } 
// }