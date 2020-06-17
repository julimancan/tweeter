$(document).ready(function () {
  // --- our code goes here ---

  console.log('file loaded correctly');

  $('#tweet-text').on('keyup', function () {
    const tweetLength = $(this).val().length;
    let charLeft = 140 - tweetLength;
    const counter = $(this).closest('form').find('.counter')[0];
    $(counter).val(charLeft);
    if (charLeft > 0) {
      $(counter).removeClass('negative');
      $(counter).addClass('positive');
    }
    if (charLeft < 0) {
      $(counter).removeClass('positive');
      $(counter).addClass('negative');
    }})
});

