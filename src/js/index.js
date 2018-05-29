window.onload = function() {
    var canvasSky = document.getElementById("canvasbackgroundSky");
    var canvasGame = document.getElementById("canvasGame");
    var canvasCityMiddle = document.getElementById("canvasbackgroundCity");
    var canvasMoon = document.getElementById("canvasbackgroundMoon");

  
    new Game(canvasGame, canvasSky, canvasCityMiddle, canvasMoon).start();
  };