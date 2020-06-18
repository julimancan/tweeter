/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const createTweetElement = (tweetObj) => {
    console.log(tweetObj);
    const $tweet = $("#tweet-container");
    const html =
        `<div class="tweet">
            <section class="tweet-header">
            <div class="avatar"><img src="${tweetObj.user.avatars}"><h4>${tweetObj.user.name}</h4></div>
			<div class="id">${tweetObj.user.handle}</div>
            </section>
			<p class="gossipText">${tweetObj.content.text}</p>
			<div class="footer">${tweetObj.created_at}
            <div class="socials">L F R</div>
            </div>
			</div>`;
    $tweet.prepend(html);
    // return tweetElement;
};

const renderTweets = function(tweetDB) {
    for (let tweet of tweetDB) {
        createTweetElement(tweet);
    }
};

const loadTweets = function() {
    $("#tweet-container").empty();
    $.ajax("/tweets", {
        method: "GET",
    }).then(function(data) {
        console.log("loaded the tweets");
        renderTweets(data);
    });
};

$(document).ready(() => {
    loadTweets();
    $("form").submit(function(event) {
        event.preventDefault();
        console.log("prevented!");
        // console.log("serialized form", $("#form").serialize());
        const serializedInput = $(this).serialize();
        // console.log(serializedInput)
        // console.log("counter", $('.counter').val())
        const counter = $('.counter').val();

        if (serializedInput === "text=") {
            alert("There is no gossip to be posted, please fill up the empty space with some juicy gossip!!!")
        } else if (counter < 0) {
            alert("Your Gossip is too long please make it smaller");
        } else {
            $.ajax({
                    method: "POST",
                    url: "/tweets",

                    data: serializedInput
                })
                .then(function(res) {
                    loadTweets();
                })
                .catch((err) => {
                    console.log("error", err);
                });
        }
    });
});