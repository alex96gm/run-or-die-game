
function MenuSong (){
    this.song = new Howl({
        src: ['src/audios/menu_audio.mp3'],
        autoplay: true,
        loop: true,
        volume: 0.5,
        preload:true
      });
}

MenuSong.prototype.playSongMenu = function(){

    this.song.play();
}

MenuSong.prototype.stopSongMenu = function(){
    this.song.stop();
}
