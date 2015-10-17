// Load this code even before the DOM, it won't affect the DOM elemenents.
function toggleName(event){
  $(this).find('.hover-name').slideToggle(200);  
}



$(function(){

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
        var grabHashCount = $(hashCount[userCount]);

        if(tweetsArray.length > 1000){
          grabHashCount.text('1000+'); 
        } else if( parseInt(grabHashCount.text())  !== tweetsArray.length){
          grabHashCount.fadeOut('slow',function(){
            $(this).text(tweetsArray.length).fadeIn('slow');
          });
        }
        
        userCount++;
      });
    }

    // Every three seconds it will update the number of tweets
    setInterval(updateTweetCount,3000);





    $('#user-container').on('click','li',function(){

      var userName = $(this).find('h4').text();
      var list = streams.users[userName];

      $('.modal-name').text(userName.toUpperCase());

      _.each(list,function(value,index,list){

        var time = value.created_at;
        var userTag = $('<span class="modal-tag">@' + userName + '</span>')
        var userTweets = $('<p></p>').text(value.message);
        var tweetsList = $('<li></li>').append(userTag,userTweets);
        $('.user-tweets-modal').find('ul').prepend(tweetsList);
      });

    });



    $('#user-container').on('mouseenter','li',toggleName);

    $('#user-container').on('mouseleave','li',toggleName);


    


    // When the browser first loads our HTML it starts off with only 11 tweets. But new tweets are getting generated real time because of the data_generator.js file.
    // Thats why a while loop is getting created because we have a permanent number at one point.
    // Whereas if we used a for loop. It we would be checking the length of the array all the time. And the array will always be changing. With the while loop were just sticking with one of the lengths.
    // It starts off from the back of the array because the last element in the array is the latest message




    
    function updateRealTimeTweets(){
      
       // This will show all the tweets that is currently in our home page.
       // Since arrays are objects, we need to make a new copy of the array at its current time,rather than playing with the realtime array.
       var currentTweets = Array.prototype.slice.call(streams.home);
       console.log('oldTweets',currentTweets);
       var prevIndex = currentTweets.length -1;   // ex: 10
       
       return function(){

        var checkCurrentTweets = Array.prototype.slice.call(streams.home);
        var currentIndex = checkCurrentTweets.length -1;  // ex: 100

        console.log('currentTweets',checkCurrentTweets);

         if(prevIndex !== currentIndex){

            // This means more tweets have been loaded 
            // Use underscore last right here.

            var difference = currentIndex - prevIndex  // ex: 90

            // We are creating a new Array that will only contain the tweets that is not in the first array.
            // To do this I am checking the old tweet array with the new tweets array. Getting those differences and displaying them.
            // NOTE: I COULD ALSO USE THE UNDERSCORE DIFFERENCE AND WITHOUT METHODS.
            var displayTheseTweets = _.last(checkCurrentTweets,difference)
            console.log('difference',displayTheseTweets);

            // Change the outer Exection context's variable environment variable to reference the newly updated one.
            currentTweets = displayTheseTweets;
            prevIndex = displayTheseTweets.length -1;
         } 

          // We don't want the while loop to change the old prevIndex variable while looping. So we need to make a new copy
          var index = prevIndex;
          var start = 0;

          while(start <= index) {
            var user =  currentTweets[start].user;
            var message = currentTweets[start].message;
            var timeCreated = currentTweets[start].created_at;
            var displayTime = moment(timeCreated).startOf().fromNow();
            var specificTime = moment(timeCreated).format('MMMM Do YYYY');


            // Creating the tweet elements for the home-page.

            var userContentHeader = $('<div></div>').addClass('User-Content-Header');
            var tempImg = $('<img>').attr({'src':'http://whatsupintheworld.com/wp-content/uploads/2014/06/Facebook-Blank-Photo.jpg'});
            var homeTweetUser = $('<h3>' + user + '</h3>');
            var homeTweetUserLink = $('<span>@' + user  +'</span>');
            var timePosted = $('<small></small>').text(displayTime).attr({'data-time':timeCreated});

            userContentHeader.append(tempImg,[homeTweetUser,homeTweetUserLink,timePosted]);

            var messageElement = $('<p></p>').text(message);
            var specificTime = $('<small></small>').addClass('specific-time').text(specificTime);

            var userContentWrapper = $('<div></div>').attr({'class':'User-Content clearfix','data-user':user});
            userContentWrapper.append(userContentHeader,messageElement,specificTime);

            var eachTweetWrapper = $('<li></li>').append(userContentWrapper).css({'display':'none'});
            $('.Main-Content-Tweet-List').prepend(eachTweetWrapper);

            // Change Time
            // Add Modal for each user

            $(eachTweetWrapper).fadeIn('slow').addClass('highlight-Tweets');      

            start++;
    
          } // closes while loop
       } // closes returned function
    } // closes outer function


    var checkTweets = updateRealTimeTweets()
    checkTweets();

    $("aside.Realtime-Sidebar").on('click','.updateTweets',checkTweets);

    $('.Main-Content-Tweet-List').on('mouseenter','li',function(){
      $(this).removeClass('highlight-Tweets');
    })

    setInterval(function(){
      console.log('attempting to change time');
      var c = $('.User-Content small').data('time');
      $('.User-Content small').text(moment(c).startOf().fromNow());
    },45000)
    


});