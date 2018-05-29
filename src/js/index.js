window.onload = function() {
    var canvasSky = document.getElementById("canvasbackgroundSky");
    var canvasGame = document.getElementById("canvasGame");
    var canvasCityMiddle = document.getElementById("canvasbackgroundCity");

  
    new Game(canvasGame,canvasSky,canvasCityMiddle).start();
  };