document.addEventListener('DOMContentLoaded',function(event){

  var isAnimationRunning = false;
  // array with texts to type in typewriter
  var dataText = [ "print('Hello world!');", "# I'm Alex Black", "# An information systems student at Brigham Young University"];
  
  // type one text in the typwriter
  // keeps calling itself until the text is finished
  function typeWriter(text, i, callback) {   
    if ( i < text.length ) {
      document.getElementById(text).innerHTML = '<h1>' + text.substring(0, i+1) +'<span aria-hidden="true"></span></h1>';
      setTimeout(function() {
        typeWriter(text, i +1, callback);
      }, 40);
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
        document.getElementById("funstuff").innerHTML += '<div class="row justify-content-center"><div class="col-1 pt-2"><h3 class="gray">' + (index + 1) + '</h3></div><div class="col-11 col-sm-9 col-md-6"><div id="' + dataText[index] + '"></div></div></div>'
        if (index > 0) {
          document.getElementById(dataText[index-1]).innerHTML = '<h1>' + dataText[index-1] +'</h1>';
        }
        typeWriter(dataText[index], 0, function() {
          setTimeout(function() {
            
            index ++;
            animateNextText();
          }, 500);
        });
      } else {
        isAnimationRunning = false;
        // document.querySelector("h1").innerHTML = dataText[dataText.length -1] + ' <span aria-hidden="true"></span>';
      }
    }
    animateNextText();
  }
  // start the text animation
  StartTextAnimation();
  
  var replayButton = document.getElementById('replayButton');

  replayButton.addEventListener('click', function() {
    if (!isAnimationRunning) {
      document.getElementById("funstuff").innerHTML = '';
      StartTextAnimation();
    }
  });
});


const toggleButton = document.getElementById('toggleButton');
const itemList = document.getElementById('itemList');
let isAnimating = false;

toggleButton.addEventListener('click', () => {
  if (isAnimating) {
    itemList.classList.add('floating-up-reverse');
    itemList.classList.add('hidden');
  } else {
    itemList.classList.add('floating-up');
    itemList.classList.remove('hidden');
    itemList.classList.remove('floating-up-reverse');
  }
  isAnimating = !isAnimating;
});