/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//security feature to prevent js script from being inputted in the tweet section
const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
};

// creates the html for a new tweet element
const createTweetElement = (tweetObj) => {
    const $tweet = $("#tweet-container");
    $("time.timeago").timeago();

    const html = `<div class="tweet">
            <section class="tweet-header">
                <div class="avatar-name"><img src="${
                  tweetObj.user.avatars
                }"><h4>${tweetObj.user.name}</h4></div>
			    <div class="id">${tweetObj.user.handle}</div>
            </section>

			<p class="gossipText">${escape(tweetObj.content.text)}</p>
            
            <div class="footer">${$.timeago(tweetObj.created_at)}
             <div class="icons"><i class="fas fa-flag"></i> <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i></div>
            </div>
	    </div>`;
    $tweet.prepend(html);
};

// renders all of the tweets from a database
const renderTweets = function(tweetDB) {
    for (let tweet of tweetDB) {
        createTweetElement(tweet);
    }
};

// loads previously saved tweets
const loadTweets = function() {
    $("#tweet-container").empty();
    $.ajax("/tweets", {
        method: "GET",
    }).then(function(data) {
        console.log("loaded the tweets");
        renderTweets(data);
    });
};

//renders the whole page

$(document).ready(() => {
    loadTweets();

    $("form").on("submit", function(event) {
        event.preventDefault();

        console.log("prevented!");
        const serializedInput = $(this).serialize();
        const counter = $(".counter").val();

        if (serializedInput === "text=") {
            $(".error").html(
                "There is no gossip to be posted, please fill up the empty space with some juicy gossip!!!"
            );
            $(".error").slideDown("fast");
            setTimeout(function() {
                $(".error").slideUp();
            }, 4000);
        } else if (counter < 0) {
            $(".error").html("Your Gossip is too long please make it smaller");
            $(".error").slideDown("fast");
            setTimeout(function() {
                $(".error").slideUp();
            }, 4000);
        } else {
            $(".error").slideUp("fast");
            $.ajax({
                    method: "POST",
                    url: "/tweets",
                    data: serializedInput,
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