function Game(canvasElement, canvasSky, canvasCityMiddle) {
    this.ctx = canvasElement.getContext("2d");
    //Background Sky
    this.ctxSky = canvasSky.getContext("2d");
    //this.ctxSky.globalCompositeOperation = 'destination-over';

    //Background City
    this.ctxCity = canvasCityMiddle.getContext("2d");
    //this.ctxCity.globalCompositeOperation = 'destination-over';

    this.bg = new Background(this.ctx);
    this.bgSky = new BackgroundSky(this.ctxSky);
    this.bgCity = new BackgroundCity(this.ctxCity);
  
    this.intervalId = null;
  
  }

  Game.prototype.start = function() {
    this.intervalId = setInterval(function() {
      this.clear();
  
      this.drawAll();
  
      this.moveAll();
    }.bind(this), 16);
  };
  
  Game.prototype.drawAll = function() {
    this.bg.draw();
    this.bgSky.draw();
    this.bgCity.draw();
  };
  
  Game.prototype.moveAll = function() {
    this.bg.move();
    this.bgSky.move();
    this.bgCity.move();
  };

  Game.prototype.clear = function() {
    this.ctx.clearRect(
      0, 0, this.ctx.canvas.width, this.ctx.canvas.height
    );

    this.ctxSky.clearRect(
      0, 0, this.ctxSky.canvas.width, this.ctxSky.canvas.height
    );
    
    this.ctxCity.clearRect(
      0, 0, this.ctxCity.canvas.width, this.ctxCity.canvas.height
    );
  };