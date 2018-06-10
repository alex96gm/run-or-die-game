function Robot(ctx) {
    this.ctx = ctx;

    this.w = 80;
    this.h = 110

    this.x = 100;

    this.ground = 420 - this.h;
    this.y = this.ground;
    this.vy = 3;

    this.g = 0.5;

    this.img = new Image();
    this.img.src = "./src/assets/spritesRobot/idle/idle_000.png";
    this.img.frames = 14;
    this.img.frameIndex = 0;
    this.img.framesReady = 0;

    this.img.isReady = false;

    this.img.onload = function () {
        if(this.img.isReady === false){
            if (this.img.framesReady === this.img.frames) {
                $('.div-loading').hide();
                this.img.src = "./src/assets/spritesRobot/idle/idle_000.png";
                this.img.isReady = true;
            } else {
                this.img.framesReady++;
                var frame = this.img.framesReady.toString().padStart(3, ['0']);
                this.img.src = "./src/assets/spritesRobot/idle/idle_" + frame + ".png";
            }
        } 
    }.bind(this);

    this.img.animateEveryIdle = 5;
    this.drawCountIdle = 0;

    this.bitcoins = 0;
    this.jumpCount = 0;
};

Robot.prototype.isReady = function () {
    return this.img.isReady;
}

Robot.prototype.draw = function () {
    if (this.isReady()) {
        this.ctx.drawImage(
            this.img,
            this.img.width * 0.35,
            0,
            this.img.width * 0.44,
            this.img.height,
            this.x,
            this.y,
            this.w,
            this.h
        );

        this.drawCountIdle++;

        this.jumpHandler();
        this.checkGameOver();
    }
};

Robot.prototype.getBitCoins = function () {
    return this.bitcoins;
}

Robot.prototype.checkColisions = function (blocks, coins) {
    this.checkWithBlocks(blocks);
    this.checkWithCoins(coins);
}

Robot.prototype.checkWithBlocks = function (blocks) {
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

Robot.prototype.checkWithCoins = function (coins) {
    coins.forEach((coin, i) => {
        if (coin.collide(this)) {
            coins.splice(i, 1);
            this.bitcoins++;
        }
    });
}

Robot.prototype.jumpHandler = function () {
    this.y += this.vy;

    if (this.isJumping()) {
        this.vy += this.g;
    } else {
        this.vy = 0;
    }
}

Robot.prototype.collideWithBlock = function (block) {
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

Robot.prototype.jump = function () {
    if (this.jumpCount >= 2 && !this.isJumping()) {
        this.jumpCount = 0;
    }

    if (this.jumpCount != 2) {
        this.vy -= 15;
        this.jumpCount++;
    }
};

Robot.prototype.isJumping = function () {
    return this.y < this.ground;
};


Robot.prototype.animate = function (stateGame) {
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
};

Robot.prototype.idleAnimate = function () {
    this.img.frames = 14;
    var frame = this.img.frameIndex.toString().padStart(3, ['0']);
    this.img.src = "./src/assets/spritesRobot/idle/idle_" + frame + ".png";
}

Robot.prototype.runAnimate = function () {
    this.img.frames = 19;
    var frame = this.img.frameIndex.toString().padStart(3, ['0']);
    this.img.src = "./src/assets/spritesRobot/running/running_" + frame + ".png";
}

Robot.prototype.jumpAnimate = function () {
    this.img.frames = 9;
    var frame = this.img.frameIndex.toString().padStart(3, ['0']);
    this.img.src = "./src/assets/spritesRobot/jump/jump_" + frame + ".png";
}

Robot.prototype.checkGameOver = function () {
    if (this.y > this.ctx.canvas.height) {
        return true;
    }
}



