$(function(){
    var $body = $('body');

    console.log(streams);
    console.log(streams.home.length);


    // When the browser first loads our HTML it starts off with only 11 tweets. But new tweets are getting generated real time because of the data_generator.js file.
    // Thats why a while loop is getting created because we have a permanent number at one point.
    // Whereas if we used a foor loop. It we would be checking the length of the array all the time. And the array will always be changing. With the while loop were just sticking with one of the lengths.

    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div></div>');
      $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.appendTo($body);
      index -= 1;
    }

});