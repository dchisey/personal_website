var heroMarketing = document.querySelector('#marketing'),
    heroCoding = document.querySelector('#coding'),
    heroImgs = document.querySelectorAll('main>section'),
    nav = document.querySelector('nav'),
    h1 = document.querySelector('main>section>h1');

console.log([heroMarketing]);

function getDistance(x1, x2, y1, y2) {
  var xs = x2 - x1,
      ys = y2 - y1;

  xs *= xs;
  ys *= ys;

  return Math.sqrt(xs + ys);
}

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
        buttonY = button.offsetTop + nav.clientHeight,
        mouseX = e.clientX,
        mouseY = e.pageY,
        distance = getDistance(buttonX, mouseX, buttonY, mouseY),
        section = e.target.id == 'marketingSection' || e.target.id == 'codingSection' ? e.target : e.target.parentNode,
        id = section.id,
        height = section.clientHeight;

        console.log([button]);
        console.log(buttonX, buttonY, '|', mouseX, mouseY)
    if(id == 'marketingSection' || heroMarketing.style.opacity >= .25 ) {
      console.log(height);
      heroMarketing.style.opacity = (distance / height - 1) * -1;
    } else if (id == 'codingSection'){
      console.log(height);
      heroCoding.style.opacity = (distance / height - 1) * - 1;
    }

  }
}
