function ChooseCharacter(canvasElement) {
    this.ctx = canvasElement.getContext("2d");

    this.robot = new RobotMenu(this.ctx);
  
    this.intervalId = null;
  
  }

  ChooseCharacter.prototype.start = function() {
    this.intervalId = setInterval(function() {
        this.clear();

        this.drawAll();
        
        this.animateCharacter();
    }.bind(this), 16);
  };
  
  ChooseCharacter.prototype.clear = function() {
    this.ctx.clearRect(
        0, 0, this.ctx.canvas.width, this.ctx.canvas.height
      );
  };

  ChooseCharacter.prototype.drawAll = function() {
    this.robot.draw();
  };

  ChooseCharacter.prototype.animateCharacter = function() {
    if($('.character-one').hasClass('selected-player')){
        this.robot.animate();
    }
  };
