'use strict';

var QUIZ_AVAILABLE_SECONDS = 10;
var secondsLeft = QUIZ_AVAILABLE_SECONDS;
var timer;
var newQuestion;
// var firstTimeCorrect = true

$(document).ready(function(){
  // setTimeout(function(){
  //   console.log('4 seconds have passed');
  // }, 1000)

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var rand = getRandomInt;

  var generateQuestion = function(){
    function generateQuestionText(a, b, operator){
      return rand(a, b) + operator + rand(a, b)
    };

    function additionQuestion(a, b) {
      return generateQuestionText(a, b, '+');
    }

    return additionQuestion(1,2)
  }

  newQuestion = generateQuestion();
  $('#question').text(newQuestion);

  var resetTimer = function(){
    timer = window.setInterval(function(){ 
      secondsLeft = Number(secondsLeft) - 1;

      $('#clock').text(secondsLeft);

      if (secondsLeft == 0){
        clearInterval(timer);
        $('#clock').text('Game Over');
        $('#answer').hide();
      }

    }, 1000)
  };

  $('#answer').keyup(function(){
    // check if answer is correct
    if ($('#answer').val() == eval(newQuestion))
    {
      window.clearInterval(timer);

      var oldTime = secondsLeft;
      var newTime = Math.ceil(oldTime) + 1;
      secondsLeft = newTime;

      $('#clock').text(secondsLeft);

      resetTimer();

      newQuestion = generateQuestion();
      $('#question').text(newQuestion);
      $('#answer').val('');
    }else{
      console.log('answer is wrong');
    }
  })

});

// for (var name in myObject) {
//   if (myObject.hasOwnProperty(name)) {
//     alert(name);
//   }
// }