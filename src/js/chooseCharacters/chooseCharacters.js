function ChooseCharacter(canvasElement_1, canvasElement_2) {
  this.ctx_1 = canvasElement_1.getContext("2d");
  this.ctx_2 = canvasElement_2.getContext("2d");
  this.robot_1 = new RobotMenu(this.ctx_1);
  this.robot_2 = new RobotMenu_2(this.ctx_2);
  this.intervalId = null;
}

ChooseCharacter.prototype.start = function () {
  this.intervalId = setInterval(function () {
    this.clear();

    this.drawAll();

    this.animateCharacter();
  }.bind(this), 16);
};

ChooseCharacter.prototype.clear = function () {
  this.ctx_1.clearRect(
    0, 0, this.ctx_1.canvas.width, this.ctx_1.canvas.height
  );
  this.ctx_2.clearRect(
    0, 0, this.ctx_2.canvas.width, this.ctx_2.canvas.height
  );
};

ChooseCharacter.prototype.drawAll = function () {
  this.robot_1.draw();
  this.robot_2.draw();
};

ChooseCharacter.prototype.animateCharacter = function () {
  if ($('.character-one').hasClass('selected-player')) {
    this.robot_1.animate();
  }

  if ($('.character-two').hasClass('selected-player')) {
    this.robot_2.animate();
  }

};
