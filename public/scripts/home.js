/*-------------------------------
          ANIMATIONS
-------------------------------*/

//*******DARKEN PICTURE NEARER TO BUTTON*******

var heroMarketing = document.querySelector('#marketing'),
    heroCoding = document.querySelector('#coding'),
    heroImgs = document.querySelectorAll('main>section'),
    nav = document.querySelector('nav'),
    h1 = document.querySelector('main>section>h1');


function getDistance(x1, x2, y1, y2) {
  var xs = x2 - x1,
      ys = y2 - y1;

  xs *= xs;
  ys *= ys;

  return Math.sqrt(xs + ys);
}

//add the event listeners to this
heroImgs.forEach(element => {
  element.onmouseenter = changeOpacity;

  element.onmouseleave = function(e) {
    if(e.target.id == 'marketingSection') {
      heroMarketing.style.opacity = 0.25;
    } else if (e.target.id == 'codingSection') {

      heroCoding.style.opacity = 0.25;
    }
  }

})


function changeOpacity(event) {
  event.target.onmousemove = function(e) {
    var button = event.target.querySelector('button'),
        buttonX = button.offsetLeft,
        buttonY = 415,
        mouseX = e.clientX,
        mouseY = e.pageY,
        section = e.target.id == 'marketingSection' || e.target.id == 'codingSection' ? e.target : e.target.parentNode,
        id = section.id,
        distance = section.id == 'codingSection' ? getDistance(buttonX, mouseX - section.clientWidth, buttonY, mouseY) : getDistance(buttonX, mouseX, buttonY, mouseY),
        height = section.clientHeight;

    if(id == 'marketingSection') {
      heroMarketing.style.opacity = ((distance / height - 1) * -1) / 2;
    } else if (id == 'codingSection'){
      console.log('updated');
      heroCoding.style.opacity = ((distance / height - 1) * -1) / 2;

    }

  }
}

//*******create arrows*******

Window.prototype.addMultipleELs = function(events, callback) {
  var events = events.split(' ');
  for(var i = 0; i < events.length; i++) {
    this.addEventListener(events[i], callback);
  }
}

var width, height;

window.addMultipleELs('load resize', function() {
  height = window.innerHeight;
  width = window.innerWidth;
})


var lines = [...document.querySelectorAll('div')].filter(element => { return element.dataset.line });
var sections = [...document.querySelectorAll('.allAlign')].map((el, i) => {
  var correspondingLines = lines.filter(line => {
    console.log(typeof +line.dataset.index);
    console.log(`${+line.dataset.index}|${i}, boolean: ${line.dataset.index === i}`);
    return +line.dataset.index === i;
  });
  console.log(correspondingLines);

  return {
    element: el,
    index: i,
    verticalLine: correspondingLines[0],
    horizontalLine: correspondingLines[1]
  }
});



HTMLElement.prototype.isInViewport = function() {
  var rect = this.getBoundingClientRect(),
      html = document.documentElement;

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || html.clientHeight) &&
    rect.right <= (window.innerWidth || html.clientWidth)
  );
}


window.addEventListener('scroll', function(e){
  var visibleSections = sections.filter(el => {
    return el.element.isInViewport();
  })

  visibleSections.forEach(el => {
    if (!visibleSections.length) {
      console.log('There are no elements 100% in viewport.');
    }

    if (!el.verticalLine.classList.contains('growVL')) {
      el.verticalLine.classList.add('growVL');

      window.setTimeout(e => {
        el.horizontalLine.classList.add('growHL');
      }, 1250);
    } 
  })

})

//*******CAROUSEL*******

const slides = document.querySelectorAll('.slide');
const buttons = document.querySelectorAll('.slideNavigator');
const dots = document.querySelectorAll('.dot');
var currentSlide = 0,
    previousSlide = 0,
    fcnCounter = 0;


buttons.forEach(button => {
  button.addEventListener('click', e => changeSlide(e));
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', e => changeDot(e));
})

function changeSlide(e) {
  var slideMovement = calculateSlideChange(e),
      slideDifference = +currentSlide + slideMovement;
  
  console.log(slideDifference)
  slides[currentSlide].classList = 'slide';
  if(slideDifference < 0) {
    previousSlide = currentSlide;
    currentSlide = 3 + slideDifference;
  } else {
    previousSlide = currentSlide;
    currentSlide = slideDifference % 3;
  }

  slides[currentSlide].classList = 'slide showing';
  
  if(arrowIsTarget(e)) {
    changeDot(e);
  }
}


function changeDot(e) {
  var newSlide = +dotIndex(e) || currentSlide;

  if(!arrowIsTarget(e)) {
    dots[currentSlide].classList = 'dot';
    changeSlide(e);
  } else {
    dots[previousSlide].classList = 'dot';
    currentSlide = newSlide;
  }
  console.log(currentSlide)
  dots[currentSlide].classList = 'dot selected';
}


function arrowIsTarget(e) {
  return e.target.id == 'next' || e.target.id == 'previous';
}

function dotIndex(e) {
  return e.target.dataset.order;
}

function calculateSlideChange(e) {
  var slideChange, target;

  if(arrowIsTarget(e)) {
    console.log('Arrow is the target.');
    target = e.target.id
    slideChange = target == 'next' ? 1 : -1;
  } else {
    console.log('Arrow is not the target.');
    target = dots[dotIndex(e)];

    var newSlide = +target.dataset.order;
    
    slideChange = newSlide - currentSlide;
  }

  return slideChange;
}

//Alerting people that there are no projects to look at yet

var codingButton = document.querySelector('#codingDescription > button');

codingButton.addEventListener('click', e => {alert('Not yet!')});


//Form handling
var form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault();
  var formData = sortFormData(form);
  var request = new XMLHttpRequest()
  request.open('POST', './formSubmission', true);
  request.setRequestHeader('Content-type', 'application/json');
  request.send(formData);

  alert("Thanks for sending! I'll be in contact soon.")

});

function sortFormData(form) {
  var parsedForm = {},
      elements = [...form.elements];


  elements.forEach(element => {
    if(element.name) { 
      parsedForm[element.name] = element.value;
    }
  })

  return JSON.stringify(parsedForm);
}