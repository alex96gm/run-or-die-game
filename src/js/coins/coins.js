function Coins(ctx) {
  this.ctx = ctx;

  this.img = new Image();

  this.img.src = './src/assets/coins.png';

  this.x = 30;
  this.y = 30;

  this.w = 50;
  this.h = 50;


  this.img.frames = 4;
  this.img.frameIndex = 0;
  
  this.img.frames_2 = 2;
  this.img.frameIndex_2 = 0;

  this.img.animateEvery = 5;
  this.drawCount = 0;
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