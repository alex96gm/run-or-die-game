function Score(ctx) {
  this.ctx = ctx;

  this.x = 790;
  this.y = 50;

  this.score = 0;
  this.intervalId = null;
}

Score.prototype.draw = function () {
  this.ctx.font = "40px blankaregular";
  this.ctx.fillStyle = "red";
  this.ctx.textAlign = "center";
  this.ctx.fillText('Score:  ' + Math.floor(this.score), this.x, this.y);
  this.score += 1;
};

function BitcoinScore(ctx) {
  this.ctx = ctx;

  this.x = 570;
  this.y = 50;

  this.intervalId = null;
  this.bitcoin = 0;
}

BitcoinScore.prototype.draw = function () {
  this.ctx.font = "40px blankaregular";
  this.ctx.fillStyle = "#F6CF47";
  this.ctx.textAlign = "center";
  this.ctx.fillText(Math.floor(this.bitcoin), this.x, this.y);
};

function Bitcoin(ctx) {
  this.ctx = ctx;

  this.x = 600;
  this.y = 8;

  this.img = new Image();

  this.img.src = './src/assets/coins.png';

  this.w = 50;
  this.h = 50;


  this.img.frames = 4;
  this.img.frameIndex = 0;
  
  this.img.frames_2 = 2;
  this.img.frameIndex_2 = 0;

  this.img.animateEvery = 5;
  this.drawCount = 0;
}

Bitcoin.prototype.draw = function () {
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

Bitcoin.prototype.animate = function () {
  this.img.frameIndex++;
  if(this.img.frameIndex >= this.img.frames){
    this.img.frameIndex_2++;
    if(this.img.frameIndex_2 >= this.img.frames_2){
      this.img.frameIndex_2 = 0
    }
    this.img.frameIndex = 0
  }
};