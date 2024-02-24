var isAnimationRunning = false;


function typeWriter(elementId, text, i, callback) {   
  if ( i <= text.length ) {
    document.getElementById(elementId).innerHTML = '<h1>' + text.substring(0, i+1) +'<span aria-hidden="true"></span></h1>';
    setTimeout(function() {
      typeWriter(elementId, text, i +1, callback);
    }, 40);
  } else {
    if (typeof callback === 'function') {
      callback();
    }
  }
 
  // text finished, call callback if there is a callback function
}

function StartTextAnimation(dataText) {
  isAnimationRunning = true;
  var index = 0;
  var funstuffDiv = document.getElementById("funstuff");
  function animateNextText() {
    if (index < dataText.length) {
      var elementId = 'text' + index;
      document.getElementById("funstuff").innerHTML += '<div class="row justify-content-center"><div class="col-1 pt-2"><h3 class="gray">' + (index + 1) + '</h3></div><div class="col-11 col-sm-9 col-md-6"><div id="' + elementId + '"></div></div></div>'
      if (index > 0) {
        document.getElementById('text' + (index - 1)).innerHTML = '<h1>' + dataText[index-1] +'</h1>';
      }
      typeWriter(elementId, dataText[index], 0, function() {
        setTimeout(function() {
          
          index ++;
          animateNextText();
        }, 500);
      });
      funstuffDiv.scrollTop = funstuffDiv.scrollHeight;
    } else {
      isAnimationRunning = false;
      // document.querySelector("h1").innerHTML = dataText[dataText.length -1] + ' <span aria-hidden="true"></span>';
    }
  }
  animateNextText();
}

function toggleFade(element) {
  if (element.isOpen) {
    element.classList.add('floating-up-reverse');
    element.classList.add('hidden');
  } else {
    element.classList.add('floating-up');
    element.classList.remove('hidden');
    element.classList.remove('floating-up-reverse');
  }
  element.isOpen = !element.isOpen;
}

function submitCustomText() {
  if (!isAnimationRunning) {
    var customText = dataTextInput.value.split('\n');
    if (customText.length > 0) {
        document.getElementById("funstuff").innerHTML = '';
        StartTextAnimation(customText);
        toggleFade(dataTextEntry);
        setTimeout(function() {
          dataTextInput.value = '';
        }, 500);
    }
  } else {
    alert('Wait your turn ;)');
  }
}



document.addEventListener('DOMContentLoaded',function(event){
  var dataText = [ "print('Hello world!');", "# I'm Alex Black", "# An information systems student at Brigham Young University"];
  StartTextAnimation(dataText);
  
  var replayButton = document.getElementById('replayButton');

  replayButton.addEventListener('click', function() {
    if (!isAnimationRunning) {
      document.getElementById("funstuff").innerHTML = '';
      StartTextAnimation(dataText);
    }
  });
});



// menu stuff
const toggleButton = document.getElementById('toggleButton');
const customButton = document.getElementById('customButton');
const itemList = document.getElementById('itemList');
const dataTextEntry = document.getElementById('dataTextEntry');
const submitButton = document.getElementById('dataTextSubmit');
const dataTextInput = document.getElementById('dataTextInput');

toggleButton.addEventListener('click', () => {
  if (dataTextEntry.isOpen) {
    toggleFade(dataTextEntry);
  }
  toggleFade(itemList);  
});

customButton.addEventListener('click', () => {
  if (itemList.isOpen) {
    toggleFade(itemList);
  }
  toggleFade(dataTextEntry);
  dataTextInput.focus();
});

// custom text input stuff


submitButton.addEventListener('click', () => {
  submitCustomText();
});

dataTextInput.addEventListener('keydown', (e) => {
  if (e.shiftKey && e.key === 'Enter') {
    e.preventDefault();
    submitCustomText();
  }
});