function Game(canvasElement, backGroundsElement, selectPlayer , localStorage, menuSong) {
  this.ctx = canvasElement.getContext("2d");
  this.backGroundsElement = backGroundsElement;
  this.intervalId = null;
  this.state = 'gameStopped';
  this.framesPassed = 0;
  this.selectPlayer = selectPlayer;

  this.blocks = [
    new Blocks(this.ctx, 80, 420, 400, './src/assets/block-long.png'),
    new Blocks(this.ctx, 700, 420, 400, './src/assets/block-long.png'),
    new Blocks(this.ctx, 550, 180, 133, './src/assets/block-small.png'),
    new Blocks(this.ctx, 800, 180, 133, './src/assets/block-small.png'),
    new Blocks(this.ctx, 1050, 180, 133, './src/assets/block-small.png'),
  ]

  this.scoreObject = new Score(this.ctx);
  this.localStorage = localStorage;
  this.robot = new Robot(this.ctx, this.state);

  this.addListeners();
  
  this.gameSong = new GameSong;
  this.menuSong = menuSong
}

Game.prototype.start = function () {
  this.gameSong.playGameMenu();
  this.backGroundsElement.stopAll();
  this.intervalId = setInterval(function () {
    this.framesPassed++;
    this.clear();

    this.generateBlocks();
    this.deleteBlocks();

    if(this.state === 'gameMove'){
      this.scoreObject.draw();
    }
    

    this.drawCharacter();
    this.animateCharacter();
    //this.checkColisions();
    
    this.checkGameOver();

    //this.moveAll();
  }.bind(this), 16);
};

Game.prototype.finish = function () {
  clearInterval(this.intervalId);
  this.gameSong.stopGameMenu();
  this.ctx.clearRect(
    0, 0, this.ctx.canvas.width, this.ctx.canvas.height
  );
  return { player: this.selectPlayer, score: this.scoreObject.score }
};


Game.prototype.drawCharacter = function () {
  if (this.selectPlayer === "robot") {
    this.robot.draw(this.blocks);
  }

}

Game.prototype.animateCharacter = function () {
  if (this.selectPlayer === "robot") {
    this.robot.animate(this.state);
  }
}

Game.prototype.clear = function () {
  this.ctx.clearRect(
    0, 0, this.ctx.canvas.width, this.ctx.canvas.height
  );
};

Game.prototype.generateBlocks = function () {
  var max = 120,
    min = 50;

  var random = Math.floor(Math.random() * (max - min + 1) + min);

  if (this.framesPassed % random === 0) {
    this.blocks.push(new Blocks(this.ctx));
    this.framesPassed = 0;
  }

  this.blocks.forEach(element => {
    element.draw();
    if (this.state !== 'gameStopped') {
      element.move();
    }
  });
};

Game.prototype.deleteBlocks = function () {
  this.blocks.forEach(function (element, i) {
    if (element.x + element.w < 0) {
      this.blocks.splice(i, 1);
    }
  }.bind(this));
}

Game.prototype.addListeners = function () {
  $(document).keydown(function (event) {
    switch (event.keyCode) {
      case 32:
        if (this.state === 'gameStopped') {
          this.state = 'gameMove';
          this.backGroundsElement.start();
        } else {
          if (this.selectPlayer === "robot") {
            this.robot.jump();
          }
        }
        break;
    }
  }.bind(this));
};

Game.prototype.checkGameOver = function(){
  if(this.robot.checkGameOver()){
    this.gameOver();
  }
}

Game.prototype.gameOver = function(){
  this.menuSong.playSongMenu();
  var scores = this.finish();
  
  if(!this.localStorage.getScore()){
    $(".label-score").text('NEW HIGH SCORE: ');
  }else{
    if(scores.score > this.localStorage.getScore()[0].score){
      $(".label-score").text('NEW HIGH SCORE: ');
    }else{
      $(".label-score").text('SCORE: ');
    }
  }
  
  $(".score-number").text(scores.score);
  this.localStorage.setScore(scores.player, scores.score);
  $(".div-canvas-game").slideToggle(function () {
    $(".game-over-view").slideToggle();
  }); 
}



