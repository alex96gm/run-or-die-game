var selectPlayer = '';
var game = null;

window.onload = function() {
    var canvasSky = document.getElementById("canvasbackgroundSky");
    var canvasFloor = document.getElementById("canvasbackgroundFloor");
    var canvasCityMiddle = document.getElementById("canvasbackgroundCity");
    var canvasMoon = document.getElementById("canvasbackgroundMoon");
    var canvasGame = document.getElementById("canvasGame");
    var canvasChooseCharacterRobot = document.getElementById("chooseRobot");

    var backGrounds = new BackGrounds(canvasFloor, canvasSky, canvasCityMiddle, canvasMoon)
    var chooseCharacter = new ChooseCharacter(canvasChooseCharacterRobot);
    
    chooseCharacter.start();
    backGrounds.start();

    $( ".start-game" ).on( "click", function() {
      if(selectPlayer){   
        $(".start-view").slideToggle(function(){
          $(".div-canvas-game").slideToggle();
        });
        
        game = new Game(canvasGame , backGrounds , selectPlayer);
        game.start();
     }
    });

    onKeyPress(chooseCharacter);
    onClickButtons();
  };


function onKeyPress(chooseCharacter){
    $(document).keydown(function (e) {
      switch(e.keyCode) {
        case 37:
          selectLeftChracter(chooseCharacter);
          break;
        case 39:
        console.log("danjkdbakj")
          selectRighthracter();
          break;
      }
    });
};

function selectLeftChracter(chooseCharacter){
    selectPlayer = 'robot';

    $('.character-one').addClass('selected-player');
    $('.character-two').removeClass('selected-player');

    $('.selectedCharacterText').addClass('selectedRight');
    $('.selectedCharacterText').removeClass('selectedLeft');
};

function selectRighthracter(){

    selectPlayer = 'human';

    $('.character-two').addClass('selected-player');
    $('.character-one').removeClass('selected-player');

    $('.selectedCharacterText').addClass('selectedLeft');
    $('.selectedCharacterText').removeClass('selectedRight');
};

function onClickButtons(){
  selectCharacter();
  menuToHighScore();
  highScoreToMenu();
  gameToMenu();
};

function selectCharacter(){
  $('.character-one').click(function (e) {
    selectLeftChracter();
  });

  $('.character-two').click(function (e) {
    selectRighthracter();
  });
};

function menuToHighScore(){
  $('.sim-button.button28').on( "click", function() {
    $(".start-view").slideToggle(function(){
      $(".high-scores").slideToggle();
      setScoreTable(getScore());
    });
  });
}

function highScoreToMenu(){
  $('.go-to-menu-high-score.button28').on( "click", function() {
    $(".high-scores").slideToggle(function(){
      $(".start-view").slideToggle();
    });
  });
}

function gameToMenu(){
  $('.go-to-menu-canvas.button28').on( "click", function() {
    game.finish();
  });
}

function setScoreTable(scores){
  $("tbody").empty();
  scores.forEach(element => {
    var $td1 = $("<td></td>").text(element.player); 
    var $td2 = $("<td></td>").text(element.date); 
    var $td3 = $("<td></td>").text(element.score);
    var tr = $("<tr></tr>");
    
    var $scoreRow = tr.append($td1, $td2, $td3);
    $('tbody').append($scoreRow)
  });
}


  