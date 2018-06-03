var selectPlayer = '';

window.onload = function() {
    var canvasSky = document.getElementById("canvasbackgroundSky");
    var canvasFloor = document.getElementById("canvasbackgroundFloor");
    var canvasCityMiddle = document.getElementById("canvasbackgroundCity");
    var canvasMoon = document.getElementById("canvasbackgroundMoon");
    var canvasGame = document.getElementById("canvasGame");
    var backGrounds = new BackGrounds(canvasFloor, canvasSky, canvasCityMiddle, canvasMoon)

    var canvasChooseCharacterRobot = document.getElementById("chooseRobot");
    var chooseCharacter = new ChooseCharacter(canvasChooseCharacterRobot);
    
    chooseCharacter.start();
    backGrounds.start();

    $( ".start-game" ).on( "click", function() {
      //if(selectPlayer){   
        $(".start-view").slideToggle();
        
        new Game(canvasGame , backGrounds , selectPlayer).start();
     // }
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

    if($(".character-one").hasClass('selected-player')){
      $(".ih-item.circle.effect2.left_to_right").show();
    }
    

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
};

function selectCharacter(){
  $('.character-one').click(function (e) {
    selectLeftChracter();
  });

  $('.character-two').click(function (e) {
    selectRighthracter();
  });
};




  