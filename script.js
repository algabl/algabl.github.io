

const toggleButton = document.getElementById('toggleButton');
const customButton = document.getElementById('customButton');
const itemList = document.getElementById('itemList');
const dataTextEntry = document.getElementById('dataTextEntry');
const submitButton = document.getElementById('dataTextSubmit');
const dataTextInput = document.getElementById('dataTextInput');

var isAnimationRunning = false;

function typeWriter(elementId, text) {
    let i = 0;
    return new Promise((resolve, reject) => {
        let intervalId = setInterval(() => {
            if (i <= text.length) {
                document.getElementById(elementId).textContent = text.substring(0, i + 1);
                span = document.createElement('span');
                span.setAttribute('aria-hidden', 'true');
                document.getElementById(elementId).appendChild(span);
                i++;
            } else {
                clearInterval(intervalId);
                resolve();
            }
        }, 40);
    });
}

async function StartTextAnimation(dataText) {
    isAnimationRunning = true;
    var index = 0;
    var funstuffDiv = document.getElementById("funstuff");

    for (let text of dataText) {
        var elementId = 'text' + index;
        funstuffDiv.innerHTML += `<div class="row justify-content-center"><div class="col-1 pt-2"><h3 class="gray">${index + 1}</h3></div><div class="col-11 col-sm-9 col-md-6"><h1 id="${elementId}"></h1></div></div>`;
        if (index > 0) {
            document.getElementById('text' + (index - 1)).textContent = dataText[index - 1];
        }
        await typeWriter(elementId, text);
        await new Promise(resolve => setTimeout(resolve, 500));
        funstuffDiv.scrollTop = funstuffDiv.scrollHeight;
        index++;
    }
    isAnimationRunning = false;
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
            setTimeout(function () {
                dataTextInput.value = '';
            }, 500);
        }
    } else {
        alert('Wait your turn ;)');
    }
}



document.addEventListener('DOMContentLoaded', function (event) {
    var dataText = ["print('Hello world!');", "# I'm Alex Black", "# An information systems student at Brigham Young University"];
    StartTextAnimation(dataText);

    var replayButton = document.getElementById('replayButton');

    replayButton.addEventListener('click', function () {
        if (!isAnimationRunning) {
            document.getElementById("funstuff").innerHTML = '';
            StartTextAnimation(dataText);
        }
    });


    const glowElements = document.querySelectorAll('.glow-effect');

    glowElements.forEach(function (button) {
        button.style.setProperty('--mouse-x', '-100%');
        button.style.setProperty('--mouse-y', '-100%');
    });

    document.addEventListener('mousemove', function (event) {
        // Calculate the mouse position relative to the button container
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        glowElements.forEach(function (button) {
            // Calculate the mouse position relative to the button
            const buttonX = mouseX - button.getBoundingClientRect().left;
            const buttonY = mouseY - button.getBoundingClientRect().top;

            // Update the left and top properties of the ::before pseudo-element
            button.style.setProperty('--mouse-x', buttonX + 'px');
            button.style.setProperty('--mouse-y', buttonY + 'px');
        });
    });
});


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

