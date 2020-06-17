/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetDB = {
    user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
    },
    content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
};

const createTweetElement = (tweetDB) => {
    const $tweet = $("<article>").addClass("tweet");
    const html = `<div>
				<h4>${tweetDB.user.name}</h4>
				<div class="id">${tweetDB.user.handle}</div>
			</div>
			<p class="gossipText">${tweetDB.content.text}</p>
			<div class="footer">${tweetDB.created_at}
				<div class="socials">L F R</div>
			</div>`;
    const tweetElement = $tweet.append(html);
    return tweetElement;
};
// $($tweet).append(tweetDB);
const $tweet = createTweetElement(tweetDB);


$(document).ready(() => {
    console.log($tweet);
    $("#tweet-container").append($tweet);

    $("#button").submit((event) => {
        event.preventDefault();
        console.log('prevented?')
    })
});