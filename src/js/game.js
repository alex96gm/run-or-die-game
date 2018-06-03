function Game(canvasElement, backGroundsElement, selectPlayer) {
  this.ctx = canvasElement.getContext("2d");
  this.backGroundsElement = backGroundsElement;
  this.intervalId = null;
  this.state = 'gameStopped';
  this.framesPassed = 0;
  this.selectPlayer = selectPlayer;
  console.log('robot');
  this.blocks = [
    new Blocks(this.ctx, 80, 420, 400, './src/assets/block-long.png'),
    new Blocks(this.ctx, 700, 420, 400, './src/assets/block-long.png'),
    new Blocks(this.ctx, 550, 180, 133, './src/assets/block-small.png'),
    new Blocks(this.ctx, 800, 180, 133, './src/assets/block-small.png'),
    new Blocks(this.ctx, 1050, 180, 133, './src/assets/block-small.png'),
  ]

  this.scoreObject = new Score(this.ctx);

  this.robot = new Robot(this.ctx, this.state);

  this.addListeners();
}

Game.prototype.start = function () {

  this.backGroundsElement.stopAll();

  this.intervalId = setInterval(function () {
    this.framesPassed++;
    this.clear();

    this.generateBlocks();
    this.deleteBlocks();
    this.scoreObject.draw();

    this.drawCharacter();
    this.animateCharacter();
    //this.moveAll();
  }.bind(this), 16);
};

Game.prototype.finish = function () {
  this.intervalId = null;
};


Game.prototype.drawCharacter = function(){
  if(this.selectPlayer === "robot"){
    this.robot.draw();
  }
  
}

Game.prototype.animateCharacter = function(){
  if(this.selectPlayer === "robot"){
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
    if(this.state !=='gameStopped'){
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
        if(this.state === 'gameStopped'){
          this.state = 'gameMove';
          this.backGroundsElement.start();      
        } else{
          //console.log(this.state);
          if(this.selectPlayer === "robot"){
            this.robot.jump();
          }         
        }
        break;
    }
  }.bind(this));
};

