function GameSong (){
    this.song = new Howl({
        src: ['./src/audios/game_audio.mp3'],
        autoplay: true,
        loop: true,
        volume: 0.5,
        preload:true
      });

}

GameSong.prototype.playGameMenu = function(){
    this.song.play();
}

GameSong.prototype.stopGameMenu = function(){
    this.song.stop();
}