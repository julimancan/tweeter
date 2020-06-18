/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}


const createTweetElement = (tweetObj) => {
    // console.log(tweetObj);
    // console.log("escape", escape($tweetObj.content))
    const $tweet = $("#tweet-container");
    $("time.timeago").timeago();

    const html =
        `<div class="tweet">
            <section class="tweet-header">
                <div class="avatar-name"><img src="${tweetObj.user.avatars}"><h4>${tweetObj.user.name}</h4></div>
			    <div class="id">${tweetObj.user.handle}</div>
            </section>

			<p class="gossipText">${escape(tweetObj.content.text)}</p>
            
            <div class="footer">${$.timeago(tweetObj.created_at)}
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


    // $('form').validate({

    //     rules: {
    //         text: { required: true, maxlength: 140 }
    //     },
    //     errorContainer: "#validationSummary",
    //     errorLabelContainer: "#validationSummary ul",
    //     wrapper: "li",

    //     showErrors: function(errorMap, errorList) {
    //         $('.errorList').hide();
    //         $('.inlineMessage').hide();
    //         $('#validationSummary').hide();
    //         let messages = "";
    //         $.each(errorList, function(index, value) {
    //             let id = $(value.element).attr('id');
    //             messages += `<span> ${index + 1}. <a title='click to view field' href='javascript:setFocus(${id});'>[ ${$(value.element).attr('name')}]</a>${value.message}</span>`;
    //         })
    //     }
    // })



    $("form").on("submit", function(event) {
        event.preventDefault();

        console.log("prevented!");
        // console.log("serialized form", $("#form").serialize());
        const serializedInput = $(this).serialize();
        // console.log(serializedInput)
        // console.log("counter", $('.counter').val())
        const counter = $('.counter').val();

        if (serializedInput === "text=") {
            $(".error").html("There is no gossip to be posted, please fill up the empty space with some juicy gossip!!!");
            $(".error").slideDown("fast");
            setTimeout(function() {
                $(".error").slideUp()
            }, 4000);
        } else if (counter < 0) {
            $(".error").html("Your Gossip is too long please make it smaller");
            $(".error").slideDown("fast");
            setTimeout(function() {
                $(".error").slideUp()
            }, 4000);
        } else {
            $(".error").slideUp("fast");
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
            // $("#button").click(function() {
            //     event.preventDefault();
            // })
        }

    });
    // })
});