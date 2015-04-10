window.onload = function(){
    var _d = document;
    function Ipod(){
        this.audio = _d.getElementById('audio'); 
    }
    Ipod.prototype.__defineSetter__('songName',function( name ){
        this.song = name;   
        this.audio.src = './songs/' + name;
    });
    var ipod = new Ipod();
    console.log(ipod.audio);
    ipod.songName = '2.mp3';
    console.log(ipod.song);


    document.onselectstart = function(){
        return false;
    }
    document.oncontextmenu = function(){
        return false;
    }
}
