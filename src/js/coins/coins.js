function Coins(ctx , x, y) {
  this.ctx = ctx;

  this.img = new Image();

  this.img.src = './src/assets/coins.png';

  

  this.w = 50;
  this.h = 50;

  this.coinsArray = [420 - this.h, 180 - this.h];
  this.x = x || this.ctx.canvas.width;
  this.y = y || this.coinsArray[Math.floor(Math.random() * this.coinsArray.length)];;

  

  this.vx = -2.5;

  this.img.frames = 4;
  this.img.frameIndex = 0;
  
  this.img.frames_2 = 2;
  this.img.frameIndex_2 = 0;

  this.img.animateEvery = 5;
  this.drawCount = 0;

  this.colliding = false;
}

Coins.prototype.draw = function () {
  this.drawCount++;
  this.ctx.drawImage( 
    this.img,
    this.img.frameIndex * this.img.width / this.img.frames,
    this.img.frameIndex_2 * this.img.height / this.img.frames_2,
    this.img.width / this.img.frames,
    this.img.height / this.img.frames_2,
    this.x,
    this.y,
    this.w,
    this.h
  );

  if(this.drawCount % this.img.animateEvery === 0){
    this.animate();
    this.drawCount = 0;
  }
};

Coins.prototype.animate = function () {
  this.img.frameIndex++;
  if(this.img.frameIndex >= this.img.frames){
    this.img.frameIndex_2++;
    if(this.img.frameIndex_2 >= this.img.frames_2){
      this.img.frameIndex_2 = 0
    }
    this.img.frameIndex = 0
  }
};

Coins.prototype.move = function() {
  this.x += this.vx;
};

Coins.prototype.collide = function(object) {
  this.colliding = !(
    this.x + this.w < object.x ||
    this.x > object.x + object.w ||
    this.y + this.h < object.y || 
    this.y > object.y + object.h
  );

  return this.colliding;
}