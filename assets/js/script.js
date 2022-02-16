
let keywordsArray = [];
let tooltipTitle;
let tooltipSnippet;
let tooltipLink;
let tooltipHTML;
let tooltipEl;
let categoryID;
let categoryFilterString = "";
let timeSpan = "month";
let subreddit = "r/subreddit";
let sortBy = "top";
let scope = "false";
const searchRegExp = /\s/g;
const replaceWith = '_';
// const result = 'duck duck go'.replace(searchRegExp, replaceWith);
getKeywords();
$("#subredditselection").prop("disabled", true);
searchOnReddit($("#recentsearches").val());
$("#searchBtn").on("click", function (event) {
    event.preventDefault();
    //get the textbox value
    if ($("#userData").val() === "") {
        console.log("type in something"); //should we allow user to search without keyword? modal for warning?
    } else {
        searchOnReddit($("#userData").val());
        saveKeywords($("#userData").val());
        renderKeywords();
    }
})
function searchOnWikipedia(term) {
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
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                return;
            }
        })
        .then(function (data) {
            if (!data) {
                console.log("We ran into some issues, please contact the developer at zhangxuyang.chn@gmail.com");
            } else {
                console.log(data);
                $(tooltipEl).tooltip('dispose');
                tooltipTitle = data.query.search[0].title;
                tooltipSnippet = data.query.search[0].snippet;
                tooltipLink = "https://en.wikipedia.org/wiki/" + data.query.search[0].title.replace(searchRegExp, replaceWith);
                tooltipHTML = `<p>${tooltipTitle}</p><p>${tooltipSnippet}</p><a href="${tooltipLink}" target="_blank">${tooltipLink}</a>`;
                tooltipEl.setAttribute("data-toggle", "tooltip");
                $(tooltipEl).tooltip({ title: `${tooltipHTML}`, html: true, placement: "bottom", delay: { "show": 0, "hide": 3000 } });
            }
        })
}

$("#recentsearches").on("change", function () {
    searchOnReddit($("#recentsearches").val());
})
// Event Listener for Text Highlight
//https://stackoverflow.com/questions/3731328/on-text-highlight-event
function debounce(fn, delay) {
    let timer = null;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
};
// const redditPostContainer = document.getElementById("redditpostcontainer");
//   $("#redditpostcontainer").on("selectionchange",debounce(function (event) {
//     let selection = document.getSelection ? document.getSelection().toString() :  document.selection.createRange().toString() ;
//     console.log(selection);
//   }, 250));
document.addEventListener("selectionchange", debounce(function (event) {
    let selection = document.getSelection ? document.getSelection().toString() : document.selection.createRange().toString();
    if (selection === "") { //essential to filter out clicks without selection
        return;
    } else {
        tooltipEl = document.getSelection().anchorNode.parentNode;
        searchOnWikipedia(selection);
    }
}, 500));


// Reddit Search Function
function searchOnReddit(keyword) {
    let requestUrl = `https://www.reddit.com/${subreddit}/search.json?q=${keyword}&sort=${sortBy}&t=${timeSpan}&limit=3&restrict_sr=${scope}${categoryFilterString}`;
    console.log(requestUrl);
    // let requestUrl = `https://www.reddit.com/r/${subreddit}/search.json?q=${keyword}&sort=${sortBy}&t=${timeSpan}&limit=3&restrict_sr=${scope}&category=${categoryID}`;
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
                console.log("We ran into some issues, please contact the developer at zhangxuyang.chn@gmail.com");
            } else {
                console.log(data);
                if (data.data.dist ==0) {
                    $("#searchresulttitle").text("No Search Result Returned");
                    $("#redditpostcontainer").empty();
                } else {
                    renderRedditSearchResults(data);
                }
                
            }
        })
}

// Render Reddit Search Results
function renderRedditSearchResults(jsonresponse) {
    $("#redditpostcontainer").empty();
    for (let i = 0; i < jsonresponse.data.children.length; i++) {
        $("#redditpostcontainer").append(
            `<div class="card" style="width: 18rem;">
    <div class="card-header mt-0 pb-0">
      <p class="card-text reddit-post-sr pt-0 my-0">${jsonresponse.data.children[i].data.subreddit_name_prefixed}</p>
      <p class="card-text reddit-post-author my-0"> Posted by u/${jsonresponse.data.children[i].data.author}</p>
      <p class="card-text reddit-post-time mb-1"> on ${moment.unix(jsonresponse.data.children[i].data.created).format("MM/DD/YYYY")}</p>
    </div>
    <div class="card-body pt-0">
      <h5 class="card-title reddit-post-title">${jsonresponse.data.children[i].data.title}</h5>
      <img src="${returnPreviewImage(jsonresponse.data.children[i])}" class="card-img-top" alt="..." style="max-height:250px; max-width:250px; width:auto; heigh:auto; margin: 0 auto; display:block">
      
    </div>
    <div class="container d-flex justify-content-between card-footer">
      <span class="commentcount"><i class="fas fa-comment-dots"></i> ${jsonresponse.data.children[i].data.num_comments}</span>
      <span class="upcount"><i class="fas fa-arrow-alt-circle-up"></i> ${jsonresponse.data.children[i].data.ups}</span>
      <span class="downcount"><i class="fas fa-arrow-alt-circle-down"></i> ${jsonresponse.data.children[i].data.downs}</span>
    </div>`
        )
    }
}
// check preview image, pull gif if there is one
function returnPreviewImage(child) {
    if (!child.data.preview) {
        return "https://play-lh.googleusercontent.com/MDRjKWEIHO9cGiWt-tlvOGpAP3x14_89jwAT-nQTS6Fra-gxfakizwJ3NHBTClNGYK4"
    } else if (child.data.preview.images[0].variants.gif) {
        return child.data.preview.images[0].variants.gif.source.url;
    } else if (!child.data.media) {
        return child.data.preview.images[0].source.url;
    } else {
        return child.data.media.oembed.thumbnail_url;
    }
}
// save to localstorage
function saveKeywords(keywords) {
    // const exists = Boolean(keywordsArray.find(x => keywords));
    if (keywordsArray.length >= 10) {
        keywordsArray.pop();
    }
    keywordsArray.unshift(keywords);
    localStorage.setItem("KeywordsArray", JSON.stringify(keywordsArray));
}
// read from localstorage
function getKeywords() {
    keywordsArray = JSON.parse(localStorage.getItem("KeywordsArray")) || [];
    renderKeywords();
}
// Render keywords on screen
function renderKeywords() {
    $("#recentsearches").empty();
    for (let i = 0; i < keywordsArray.length; i++) {
        $("#recentsearches").append(
            `<option value="${keywordsArray[i]}">${keywordsArray[i]}</option>`
        );
    }
}
// Get all available categories
function loadCategories() {
    let requestUrl = `https://www.reddit.com/api/available_subreddit_categories.json`;
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
                console.log("We ran into some issues, please contact the developer at zhangxuyang.chn@gmail.com");
            } else {
                // console.log(data);
                $("#categories").empty();
                $("#categories").append(
                    `<option value="any">Any</option>`
                );
                for (let i = 0; i < data.length; i++) {
                    $("#categories").append(
                        `<option value="${data[i].category_id}">${data[i].category_name}</option>`
                    );
                }
            }
        })
}
loadCategories();
// Get all subreddit by category
function loadSubredditByCat(categoryID) {
    let requestUrl = `https://www.reddit.com/api/subreddits_in_category.json?category=${categoryID}&limit=10`;
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
                console.log("We ran into some issues, please contact the developer at zhangxuyang.chn@gmail.com");
            } else {
                console.log(data);
                $("#subredditlist").empty();
                for (let i = 0; i < data.data.children.length; i++) {
                    $("#subredditlist").append(
                        `<option value="${data.data.children[i].data.display_name_prefixed}">`
                    );
                }
            }
        })
}
$("#categories").on('change', function () {
    loadSubredditByCat($("#categories").val());
    categoryID = $("#categories").val();
    if (categoryID === "any") {
        categoryFilterString = ""
    } else {
        categoryFilterString = "&category=" + categoryID;
    }
    $("#subredditselection").val("");
});
$("#scope").on('change', function () {
    if ($("#scope").val() === "Reddit") {
        scope = "false";
        $("#subredditselection").prop("disabled", true);
        subreddit = "r/subreddit";
    } else {
        scope = "true";
        $("#subredditselection").prop("disabled", false);
    }
});


$("#sortby").on('change', function () {
    sortBy = $("#sortby").val();
});
$("#timespan").on('change', function () {
    timeSpan = $("#timespan").val();
});
$("#subredditselection").on("input", function (event) {
    if (event.inputType == "insertReplacementText" || event.inputType == null) {
        subreddit = $('#subredditselection').val();
    }
})