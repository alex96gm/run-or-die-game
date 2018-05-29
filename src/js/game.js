function Game(canvasElement,canvasSky) {
    this.ctx = canvasElement.getContext("2d");
    //Background Sky
    this.ctxSky = canvasElement.getContext("2d");
    this.ctxSky.globalCompositeOperation = 'destination-over';

    this.bg = new Background(this.ctx);
    this.bgSky = new BackgroundSky(this.ctxSky);
    
  
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
  };
  
  Game.prototype.moveAll = function() {
    this.bg.move();
    this.bgSky.move();
  };

  Game.prototype.clear = function() {
    this.ctx.clearRect(
      0, 0, this.ctx.canvas.width, this.ctx.canvas.height
    );
  };