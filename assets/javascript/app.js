var cartoons = ["Pheneas and Ferb", "Tom and jerry", "bucks bunny"];

$(document).ready(function() {


  var APIKey = "9jF2XhQb3TvhqcwEDbVMWaVedsnnxr53";
// '#add-cartoon',
  $(document).on("click", ".cartoon-buttons", function(e) {
    e.preventDefault();

    var cartoonDataFromForm = $(this).attr('data-cartoons');

    console.log(cartoonDataFromForm);

    displayGif(cartoonDataFromForm);
  })

  
  function displayGif(chicken) {

    var cartoons = $(this).attr("data-cartoons");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      chicken + "&api_key=" + APIKey + "&limit=10";

      // create an ajax call
      $.ajax({
        url: queryURL,
        method: "GET",
        }).then(function(response) {
          $("#animation").empty()
          var comics = response.data
          console.log(comics)
          for (var i=0; i<comics.length; i++){
            var gifImage= $("<img>");
            gifImage.attr('src', comics[i].images.downsized_still.url)
            gifImage.attr("data-still", comics[i].images.downsized_still.url);
            gifImage.attr("data-state", "still")
            gifImage.attr("class", "gif");

            gifImage.attr("data-animate", comics[i].images.downsized.url )
            $("#animation").append(gifImage);

          }
         
      })
  }
  function renderButtons(){
    console.log(cartoons)
    $("#generateButtons").empty();
     // Loops through the array of movies
     for (var i=0; i<cartoons.length; i++){
      // Then dynamicaly generates buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a =$("<button>");
      // add a class to the button
      a.addClass("btns");
      a.addClass("cartoon-buttons")
      // Added a data-attribute
     a.attr("data-cartoons", cartoons[i]);
    // Provided the initial button text
     a.text(cartoons[i]);
     // Added the button to the buttons-view div
     $("#generateButtons").append(a);

    }
  
  }
 
   $(document).on("click", ".gif", function(){
     var state=$(this).attr("data-state");
     console.log(state)
     if(state==="still"){
      
       $(this).attr("src", $(this).attr("data-animate"));
       $(this).attr("data-state", "animate")
     }else {
       $(this).attr("src", $(this).attr("data-still"));
       $(this).attr("data-state", "still");
     }
   })
    $("#add-cartoon").on("click", function(event){
    event.preventDefault();

    // This line of code will grab the input from the textbox
    var cartoon = $("#cartoon-input").val().trim();
    console.log(cartoon)
   // The movie from the textbox is then added to our array
    cartoons.push(cartoon);
     // Calling renderButtons which handles the processing of our movie array
     renderButtons();
    
  });
  $(document).on("click", ".btn",  displayGif );

  renderButtons();


  })

