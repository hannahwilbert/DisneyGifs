var movies = ["Cinderella", "Snow White", "Sleeping Beauty", "Bambi", "Frozen"];
var numberOfGIFs = 10;
var cutOffRating = "PG";

// Making button and class for each array index
function renderButtons() {
    for (var i = 0; i < movies.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("btn");
        newButton.addClass("movie-button");
        newButton.text(movies[i]);
        $("#button-container").append(newButton);
    }

    // making gifs appear when button is clicked

    $(".movie-button").unbind("click");

    $(".movie-button").on("click", function () {
        $(".gif-image").unbind("click");
        $("#gif-container").empty();
        $("#gif-container").removeClass("dotted-border");
        populateGIFContainer($(this).text());
    });

}

// adding new buttons 

function addButton(movie) {
    if (movies.indexOf(movie) === -1) {
        movies.push(movie);
        $("#button-container").empty();
        renderButtons();
    }
}

function populateGIFContainer(movie) {
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?q=" + movie +
            "&api_key=61TKqzUDPHfv40Bqr6iEsqqBCfa360mt&rating=" + cutOffRating + "&limit=" + numberOfGIFs,
        method: "GET"
    })
    
    .then(function (response) {
        response.data.forEach(function (element) {
            newDiv = $("<div>");
            newDiv.addClass("individual-gif-container");
            newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
            var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
            newImage.addClass("gif-image");
            newImage.attr("state", "still");
            newImage.attr("still-data", element.images.fixed_height_still.url);
            newImage.attr("animated-data", element.images.fixed_height.url);
            newDiv.append(newImage);
            $("#gif-container").append(newDiv);
        });

        $("#gif-container");
        $(".gif-image").unbind("click");
        $(".gif-image").on("click", function () {
            if ($(this).attr("state") === "still") {
                $(this).attr("state", "animated");
                $(this).attr("src", $(this).attr("animated-data"));
            }
            else {
                $(this).attr("state", "still");
                $(this).attr("src", $(this).attr("still-data"));
            }
        });
    });
}

$(document).ready(function () {
    renderButtons();
    $("#submit").on("click", function () {
        event.preventDefault();
        addButton($("#disney-movie").val().trim());
        $("#disney-movie").val("");
    });
});