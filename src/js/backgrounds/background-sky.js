function BackgroundSky(ctx) {
    this.ctx = ctx;
  
    this.img = new Image();
    this.img.src = "./src/assets/moon.png";
    // this.img.isReady = false;
    // this.img.onload = function() {
    //   this.img.isReady = true;
    // }
  
    this.x = 0;
    this.y = 0;
  
    this.w = 1500;
    this.h = 500;
  
    this.vx = -0.5;
  }

  BackgroundSky.prototype.isReady = function() {
    return this.img.isReady;
  }

  
  BackgroundSky.prototype.draw = function() {
   // if (this.isReady()) {
      this.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.w,
        this.h
      );
    
      this.ctx.drawImage(
        this.img,
        this.x + this.w,
        this.y,
        this.w,
        this.h
      );
   // }
  };
  
  BackgroundSky.prototype.move = function() {
    this.x += this.vx;
  
    if(this.x <= -this.w) {
      this.x = 0;
    }
  };

  BackgroundSky.prototype.stop = function() {
    if(this.x <= -this.w) {
      this.x = 0;
    }
  };
  
  BackgroundSky.prototype.clearCanvas = function() {
    this.ctx.clearRect(
      0, 0, this.ctx.canvas.width, this.ctx.canvas.height
    );
  };
  