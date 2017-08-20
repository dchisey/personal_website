var canvas = document.getElementById('logo'),
    context = canvas.getContext('2d'),
    xStart = canvas.width / 2,
    yStart = canvas.height / 2,
    radius = 29;

context.beginPath();
context.arc(xStart, yStart, radius, 2 * Math.PI, false);
context.fillStyle = '#515151';
context.fill();
