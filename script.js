document.addEventListener('DOMContentLoaded',function(event){

  var isAnimationRunning = false;
  // array with texts to type in typewriter
  var dataText = [ "Hello world.", "I'm Alex Black.", "An information systems student at Brigham Young University."];
  
  // type one text in the typwriter
  // keeps calling itself until the text is finished
  function typeWriter(text, i, callback) {   
    if ( i < text.length ) {
      document.querySelector("h1").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';
      setTimeout(function() {
        typeWriter(text, i +1, callback);
      }, 100);
    } else {
      if (typeof callback === 'function') {
        callback();
      }
    }
   
    // text finished, call callback if there is a callback function
  }
  // start a typewriter animation for a text in the dataText array
   function StartTextAnimation() {
    isAnimationRunning = true;
    var index = 0;
    function animateNextText() {
      if (index < dataText.length) {
        typeWriter(dataText[index], 0, function() {
          setTimeout(function() {
            document.querySelector("h1").textContent = "";
            index ++;
            animateNextText();
          }, 1000);
        });
      } else {
        isAnimationRunning = false;
        document.querySelector("h1").innerHTML = dataText[dataText.length -1] + ' <span aria-hidden="true"></span>';
      }
    }
    animateNextText();
  }
  // start the text animation
  StartTextAnimation();
  
  var replayButton = document.getElementById('replayButton');

  replayButton.addEventListener('click', function() {
    if (!isAnimationRunning) {
      document.querySelector("h1").textContent = "";
      StartTextAnimation();
    }
  });
});