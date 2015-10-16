// Load this code even before the DOM, it won't affect the DOM elemenents.
function toggleName(event){
  $(this).find('.hover-name').slideToggle(200);  
}



$(function(){

    var $body = $('body');

    console.log(streams);
    console.log(streams.home.length);

    // TRAVERSAL IS FASTER THAN SELECTORS
    var userContainer = $('#user-container').children('li');

    var userNameTags = userContainer.find('h4');
    var hoverTags = userContainer.find('.hover-name')
    var hashCount = userContainer.find('.user-info-wrapper').find('.tweets-number');


    (function(){
      var userCount = 0;

      _.each(streams.users,function(eachTweet,name,list){

        $(userNameTags[userCount]).text(name);
        $(hoverTags[userCount]).text(name);
        $(hashCount[userCount]).text(eachTweet.length);
         
        userCount++;
      });
    }());





    function updateTweetCount(){
      var userCount = 0;
      _.each(streams.users,function(tweetsArray,name,list){
        if(tweetsArray.length > 1000){
          $(hashCount[userCount]).text('1000+'); 
        } else {
          $(hashCount[userCount]).text(tweetsArray.length);
        }
        userCount++;
      });
    }

    // Every three seconds it will update the number of tweets
    setInterval(updateTweetCount,3000);








    $('#user-container').on('click','li',function(){
      // Display the modal for the users timeline
    });


    $('#user-container').on('mouseenter','li',toggleName);

    $('#user-container').on('mouseleave','li',toggleName)

    


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