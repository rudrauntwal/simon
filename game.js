var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var gamePattern = [];

var level = 0;

var started = false;

$(".btn").on("click", function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// calling nextSequence on first key pressed

$(document).on("keydown", function (event) {
  if (!started) {
    $("#level-title").text("Level " + level);

    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern.length = 0; //Making array empty
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  level++;

  $("#level-title").text("Level " + level);

  // Selection of Element using jQuery
  // Animation Effect of fadeIn and fadeOut
  setTimeout(() => {
    $("#" + randomChosenColour)
      .fadeOut(50)
      .fadeIn(50);
  }, 10);

  // Making Sound
  playSound(randomChosenColour);
}

// playing sound function
function playSound(name) {
  $(".btn").autoplay = true;
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animating buttons when they get clicked
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// checking answers
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

// start game after Over

function startOver() {
  level = 0;
  gamePattern.length = 0; //Making array empty approach 1
  //userClickedPattern = []; //Making array empty approach 2
  started = false;
}

// For responsiveness on mobile
$(document).ready(function () {
  if (screen.width < 990) {
    $(".footer").before("<button class='for-mobile'>Start</button>");
  }
  $(".for-mobile").on("click", function () {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
      $(".for-mobile").text("Restart");
    } else {
      startOver();
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
});
