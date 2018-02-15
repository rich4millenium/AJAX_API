$(document).on('click', "button", function() {
    var animal = $(this).attr('data-animal');
    $("#animals").empty();
    

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=5StzNorv7FGRNMIvb0X0ZmBqm7xDwPbB&limit=10";

    $.ajax({
        url: queryURL, 
        method: 'GET'
    }).then(function(response){
        var animalResult = response.data;
            console.log(animalResult)
            

        for (var i = 0; i < animalResult.length; i++){

            var gifDiv = $("<div>")

            var animalRating = animalResult[i].rating;
            var p = $("<p>").text("rating: " + animalRating);
            var animalGiphy = $("<img>");
            animalGiphy.attr("data-still", animalResult[i].images.fixed_height_still.url);
            animalGiphy.attr("src", animalResult[i].images.fixed_height_still.url);
            animalGiphy.attr("data-animate", animalResult[i].images.fixed_height.url);
            animalGiphy.attr("data-state", 'still')
            animalGiphy.addClass("gif");


            gifDiv.append(p);
            gifDiv.append(animalGiphy);

            $('#animals').append(gifDiv);

        };


        $('.gif').on('click', function(){

        var state = $(this).attr("data-state");

        if ( state === 'still'){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate")
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

        });      
 
});

});


$("#addAnimal").on("click", function () {
    event.preventDefault();

    var newAnimal = $("#animal-input").val().trim();

    if (newAnimal === "") {
        alert("You did not fill out the form!");
        return false;
    }


    var a = $("<button>");
    a.attr("data-animal", newAnimal);
    a.text(newAnimal);

    a.attr("style", "margin-left:5px")

    console.log(a);
    $('#animalButtons').append(a);

    $('#animal-input').val("");


});