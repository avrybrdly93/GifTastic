$(document).ready(function() {

let gifsDiv = $("#gifs-div");
let buttonDiv = $("#button-div");
let submitButton = $("#submit-button");
let topics = ["cat", "lion", "elephant", "zebra", "penguin"];
let userInputButton = "";
let APIKey = "TmQu2mY8LJ2rt5r5fGX1H5PcTpMONhXO";
let userSelect = "";
let queryURL = "";
let imageURL = [];
let gifURL = [];
let limit = 10;

for (let i = 0; i < topics.length; i++) {
    let topicsButton = $("<button>");
    topicsButton.text(topics[i]);
    topicsButton.appendTo(buttonDiv);
    topicsButton.addClass("btn btn-lg btn-light topics-button");
    topicsButton.attr("style", "margin: 12px");
    topicsButton.attr("value", topics[i]);
}

submitButton.on("click", function(event) {
    let userInput = $("#user-input").val();
    event.preventDefault();
    userInputButton = $("<button>");
    userInputButton.text(userInput);
    userInputButton.appendTo(buttonDiv);
    userInputButton.addClass("btn btn-lg btn-light topics-button");
    userInputButton.attr("style", "margin: 12px");
    topicsButton.attr("value", userInput);
});

$(document.body).on('click', '.topics-button', function(){
    // gifsDiv.empty();
    // gifDiv = $("<img>");
    // gifDiv.attr("src", "assets/img/Koala.jpg");
    // gifsDiv.append(gifDiv);
    // gifDiv.attr("style", "margin:24px");
    // gifDiv.attr("class", "image-still");
    // gifDiv.attr("image-number", 0);
    // gifDiv.attr("gif-switch", "still");
    // gifDiv1 = $("<img>");
    // gifDiv1.attr("src", "assets/img/.jpg");
    // gifsDiv.append(gifDiv1);
    // gifDiv1.attr("style", "margin:24px");
    // gifDiv1.attr("class", "image-still");
    // gifDiv1.attr("image-number", 1);
    // gifDiv1.attr("gif-switch", "still");

    userSelect = $(this).attr("value");
    queryURL = "http://api.giphy.com/v1/gifs/random?tag=" + userSelect + "&api_key=" + APIKey + "&limit10";
    for (let i = 0; i < limit; i++) {
        $.ajax({
            url:queryURL,
            method: "GET",
            crossOrigin: null
        }).then(function(response) {
            console.log(response);
            imageURL.push(response.data.images.fixed_height_still.url);
            gifURL.push(response.data.image_original_url);
            //console.log(imageURL[i]);
            // console.log(imageURL);
            // console.log(queryURL);
            gifDiv = $("<img>");
            gifDiv.attr("src", imageURL[i]);
            gifsDiv.append(gifDiv);
            gifDiv.attr("style", "margin:24px");
            gifDiv.attr("class", "image-still");
            gifDiv.attr("image-number", i);
            gifDiv.attr("gif-switch", "still");
        })
    }

});

$(document.body).on("click", ".image-still", function() {
    let gifSwitch = $(this).attr("gif-switch");
    console.log($(this).attr("image-number"));
    if($(this).attr("gif-switch") === "still") {
        for(let i = 0; i < limit; i++) {
            $(this).attr("src", gifURL[$(this).attr("image-number")]);
        }
        $(this).attr("gif-switch", "animated");
    }
    else if($(this).attr("gif-switch") === "animated") {
        $(this).attr("src", imageURL[$(this).attr("image-number")]);
        $(this).attr("gif-switch", "still");
    }
});

});


// $(document.body).on("click", ".image-still", function() {
//     let gifSwitch = $(this).attr("gif-switch");
//     console.log($(this).attr("image-number"));
//     if($(this).attr("gif-switch") === "still") {
//         // for(let i = 0; i < limit; i++) {
//         //     $(this).attr("src", gifURL[$(this).attr("image-number")]);
//         // }
//         $(this).attr("src", "assets/img/Penguins.jpg");
//         $(this).attr("gif-switch", "animated");
//     }
//     else if($(this).attr("gif-switch") === "animated") {
//         $(this).attr("src", "assets/img/Koala.jpg");
//         $(this).attr("gif-switch", "still");
//     }
// });