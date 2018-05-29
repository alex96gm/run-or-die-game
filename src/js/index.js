window.onload = function() {
    var canvasSky = document.getElementById("canvasbackgroundSky");
    var canvasGame = document.getElementById("canvasGame");
  
    new Game(canvasGame,canvasSky).start();
  };