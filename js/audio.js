window.onload = function(){
    // _d.onselectstart = function(){return false};
    // _d.oncontextmenu = function(){return false};
    // 公用函数库
    var $ = function (id){ return _d.getElementById(id) };
    Node.prototype.setCss3style  = function(prop,val){
        var browser = ['webkit','moz'];
        for ( var i = 0;  i < 2;  i++){
            this.style[ browser[i] + prop.charAt(0).toUpperCase() + prop.slice(1) ] = val;
        }
        this.style[prop] = val;
    }

    var
    _d = document,
    _showPlayList = $('show-play-list'),
    _current      = $('current'),
    _remind       = $('remind'),
    _progress     = $('progress'),
    _progressFlag = $('progress-flag'),
    _songName     = $('song-name'),
    _songInfo     = $('song-info'),
    _playPause    = $('play-pause'),
    _previous     = $('previous'),
    _next         = $('next'),
    _volum        = $('volume'),
    _volumCircle  = $('volume-circle'),
    _volumShadow  = $('volume-shadow'),
    _repeat       = $('repeat'),
    _random       = $('random'),
    _cover        = $('cover'),
    _playList     = $('play-list'),
    _main         = $('main');

    //抽象类音乐播放器
    //音乐播放器可以播放一首歌，也可以播放一系列歌曲,系列中可以添加，删除
    //音乐播放器可以从开始的位置按顺序播放,也可以随机播放和单曲循环 
    //音乐播放器可以根据当前所在的播放模式切换歌曲，随机到下一首，上一首或者顺序到下一首上一首
    //音乐播放器可以暂停当前音频的播放，也可以重新开始
    //音乐播放器可以调节音量,可以调节进度 
    //音乐播放器可以获取歌曲信息
    function musicPlyer(){
        this.audio = _d.getElementById('audio'); 
    }
    musicPlyer.prototype = {
        preparePlay:function(playList){
            if( !playList || typeof playList != 'object' )
                throw Error();
            this.playList = playList;
        },
        play:function(playList){
            if( playList[0] )
                this.currendSong = playList[0];
        },
        getCurrentSong:function(){
            this.currentSong
        },
    }
    
    musicPlyer.prototype.__defineSetter__('songName',function( name ){
        this.song = name;   
        this.audio.src = './songs/' + name;
    });
    var Ipod  = new musicPlyer()
    Ipod.preparePlay({
        0:{
            name:'C major',
            url:'1.mp3',
            info:'Major C for ginus'
        },
        1:{
            name:'D major',
            url:'2.mp3',
            info:'Major D for ginus'
        }
    });
    console.log(Ipod);
    // 播放器自己的个性化操作
    // _showPlayList.addEventListener('click',function(){
    //     _playList.setCss3style('transition','.3s ease');
    //     _main.setCss3style('transition','.3s ease');
    //     _main.setCss3style('transform','rotateY(90deg)');
    //     setTimeout(function(){
    //         _main.style.display = 'none';
    //         _playList.setCss3style('transform','rotateY(0deg)');
    //     },300)
    // },false)
}
