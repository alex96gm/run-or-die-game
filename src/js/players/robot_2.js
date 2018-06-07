function Robot_2(ctx) {
  this.ctx = ctx;

  this.w = 60;
  this.h = 110;

  this.x = 100;
  this.ground = 420 - this.h;
  this.y = this.ground;

  this.vy = 0;
  this.v = 20;
  this.g = 1;

  this.img = new Image();
  this.img.src = "./src/assets/spritesRobot_2/idle/Idle_000.png";
  this.img.frames = 6;
  this.img.frameIndex = 0;

  this.img.animateEveryIdle = 5;
  this.drawCountIdle = 0;
  
  this.jumpCount = 0;
  this.isOnPlatform = false;
  this.isJump = false;
};

Robot_2.prototype.checkColisions = function (blocks) {

  this.isOnPlatform = false;

  blocks.forEach((block, i) => {
      if (
          (this.y <= block.y) &&
          (this.y + this.h <= block.y) &&
          (this.x + this.w >= block.x) &&
          (this.x <= block.x + block.w)) {
          //character in platform
          this.isOnPlatform = true
          this.isJump = false;
          
      }

  });

  if (this.isOnPlatform && this.jump) {
      this.vy = 0;
  }else{
      this.y -= this.vy;
      this.vy -= this.g;
  }
  
}

Robot_2.prototype.draw = function (blocks) {
  this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
  );

  this.drawCountIdle++;
  
  //this.robotJumpHandler();

  this.checkColisions(blocks);

  this.checkGameOver();
};

Robot_2.prototype.jump = function () {

  // if(this.jumpCount === 2 && this.isOnPlatform){
  //     this.jumpCount = 0;       
  // } 

  // if(this.jumpCount < 2){
  //if (this.isOnPlatform) {
      //this.jumpCount++;
      this.vy += this.v;
      //this.isJump = true;
 // }
  // else {
  //     this.vy += this.v;
  //     this.jumpCount++;
  // } 
  //} 
};

Robot.prototype.isJumping = function () {
  return this.y < this.ground;
};

Robot_2.prototype.animate = function (stateGame) {
  if (this.drawCountIdle % this.img.animateEveryIdle === 0) {
      this.img.frameIndex++;
      switch (stateGame) {
          case 'gameStopped':
              this.idleAnimate();
              break;
          case 'gameMove':
              if (this.isOnPlatform) {
                  this.runAnimate();
              } else {
                  this.img.frameIndex = 0;
                  this.jumpAnimate();
              }
              break;
      }
      if (this.img.frameIndex >= this.img.frames) {
          this.img.frameIndex = 0;
      }
      this.drawCountIdle = 0;
  }
}

Robot_2.prototype.idleAnimate = function () {
  this.img.frames = 6;
  var frame = this.img.frameIndex.toString().padStart(3, ['0']);
  this.img.src = "./src/assets/spritesRobot_2/idle/Idle_" + frame + ".png";
}

Robot_2.prototype.runAnimate = function () {
  this.img.frames = 8;
  this.w = 90;
  var frame = this.img.frameIndex.toString().padStart(3, ['0']);
  this.img.src = "./src/assets/spritesRobot_2/run/Run_" + frame + ".png";
}

Robot_2.prototype.jumpAnimate = function () {
  this.img.frames = 4;
  var frame = this.img.frameIndex.toString().padStart(3, ['0']);
  this.img.src = "./src/assets/spritesRobot_2/jump/Jump_" + frame + ".png";
}

Robot_2.prototype.checkGameOver = function () {
  if (this.y > this.ctx.canvas.height) {
      return true;
  }
}

