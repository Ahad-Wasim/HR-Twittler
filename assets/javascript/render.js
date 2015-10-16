// Load this code even before the DOM, it won't affect the DOM elemenents.
function toggleName(event){
  $(this).find('.hover-name').slideToggle(200);  
}



$(function(){

    var $body = $('body');

    console.log(streams);

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
      // Display the modal for the users timeline
      // function displayModal 
    });

    $('.Main-Content-Tweet-List').on('click','.USERNAME',function(){
        
        var name = $(this).text().slice(1,this.length);

        // Call the displayModal function like the one above.
    })


    $('#user-container').on('mouseenter','li',toggleName);

    $('#user-container').on('mouseleave','li',toggleName);


    


    // When the browser first loads our HTML it starts off with only 11 tweets. But new tweets are getting generated real time because of the data_generator.js file.
    // Thats why a while loop is getting created because we have a permanent number at one point.
    // Whereas if we used a for loop. It we would be checking the length of the array all the time. And the array will always be changing. With the while loop were just sticking with one of the lengths.
    // It starts off from the back of the array because the last element in the array is the latest message




    var index = streams.home.length - 1;

    while(index >=0){

      var user =  streams.home[index].user;
      var message = streams.home[index].message;
      var timeCreated = streams.home[index].created_at;
      // put this code in a function and call a setInterval for every minute
      var displayTime = moment(timeCreated).startOf().fromNow();


      // Creating the tweet elements for the home-page.

      var userContentHeader = $('<div></div>').addClass('User-Content-Header');
      var tempImg = $('<img>').attr({'src':'http://whatsupintheworld.com/wp-content/uploads/2014/06/Facebook-Blank-Photo.jpg'});
      var homeTweetUser = $('<h3>' + user + '</h3>');
      var homeTweetUserLink = $('<span>@' + user  +'</span>');
      var timePosted = $('<small></small>').text(displayTime);

      userContentHeader.append(tempImg,[homeTweetUser,homeTweetUserLink,timePosted]);

      var messegeElement = $('<p></p>').text(message);

      var userContentWrapper = $('<div></div>').attr({'class':'User-Content','data-user':user});
      userContentWrapper.append(userContentHeader,message);

      var eachTweetWrapper = $('<li></li>').append(userContentWrapper)


      $('.Main-Content-Tweet-List').append(eachTweetWrapper);
      index--;
    }

});