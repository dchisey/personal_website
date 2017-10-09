/*-------------------------------
          ANIMATIONS
-------------------------------*/

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
var form = document.querySelector('form'),
    confirmation = document.querySelector('#confirmation h2'),
    formSection = document.querySelector('#form');

form.addEventListener('submit', e => {
  e.preventDefault();
  var formData = sortFormData(form);
  var request = new XMLHttpRequest()
  request.open('POST', './formSubmission', true);
  request.setRequestHeader('Content-type', 'application/json');
  request.send(formData);

  formSection.makeTransparent();
  confirmation.appear();

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


//Form confirmation

HTMLElement.prototype.makeTransparent = function() {
  this.style.opacity = 0;
  this.style['z-index'] = 0;
}

HTMLElement.prototype.appear = function() {
  this.style['z-index'] = 1;
  this.style['font-size'] = '0px';
  this.style.opacity = 1;

  if(this.style['font-size'] === '0px') {
    console.log('Animation start.');
  }
  
  this.classList.add('submitted');
}
