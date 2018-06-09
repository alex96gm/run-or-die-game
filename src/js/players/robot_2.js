function Robot_2(ctx) {
  this.ctx = ctx;

  this.w = 70;
  this.h = 110;

  this.x = 100;
  this.ground = 420 - this.h;
  this.y = this.ground;

  this.vy = 0;
  this.v = 3;
  this.g = 0.5;

  this.img = new Image();
  this.img.src = "./src/assets/spritesRobot_2/idle/Idle_000.png";
  this.img.frames = 6;
  this.img.frameIndex = 0;

  this.img.animateEveryIdle = 5;
  this.drawCountIdle = 0;
  
  this.bitcoins = 0;
  this.jumpCount = 0;
};



Robot_2.prototype.draw = function (blocks) {
    this.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.w,
        this.h
    );

    this.drawCountIdle++;

    this.jumpHandler();
    this.checkGameOver();
};
Robot_2.prototype.checkColisions = function (blocks, coins) {
    this.checkWithBlocks(blocks);
    this.checkWithCoins(coins);  
}

Robot_2.prototype.checkWithBlocks = function(blocks){
    var collitions = blocks.filter(function (block) {
        return block.collide(this);
    }.bind(this));

    collitions.forEach(function (block) {
        this.collideWithBlock(block);
    }.bind(this));

    if (collitions.length === 0) {
        this.ground = this.ctx.canvas.height * 2;
    }
}

Robot_2.prototype.checkWithCoins = function(coins){
    coins.forEach((coin,i) => {
        if(coin.collide(this)){
            coins.splice(i,1);
            this.bitcoins++;
        }
    });
}

Robot_2.prototype.jumpHandler = function () {
    this.y += this.vy;

    if (this.isJumping()) {
        this.vy += this.g;
    } else {
        this.vy = 0;
    }

}

Robot_2.prototype.collideWithBlock = function (block) {
    if (this.y + this.h >= block.y) { //top
        this.ground = block.y - this.h;
        this.y = this.ground;
    } else if (this.y >= block.y + block.h) { //bottom
        debugger;
        this.vy = 0;
        this.ground = this.ctx.canvas.height * 2;
    } else if (this.x + this.w >= block.x) { // left
        this.vy = 0;
        this.ground = this.ctx.canvas.height * 2;
    } else {
        this.ground = this.ctx.canvas.height * 2;
    }
}
Robot_2.prototype.jump = function () {
    if (this.jumpCount >= 2 && !this.isJumping()) {
        this.jumpCount = 0;
    }

    if (this.jumpCount != 2) {
        this.vy -= 15;
        this.jumpCount++;
    }
};

Robot_2.prototype.getBitCoins = function () {
    return this.bitcoins;
}

Robot_2.prototype.isJumping = function () {
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
              if (!this.isJumping()) {
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

