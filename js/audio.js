window.onload = function(){
    var
    t,
    _d = document,
    $  = function (id){ return _d.getElementById(id) },
    _showPlayList = $('show-play-list'),
    _current      = $('curent'),
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

    // 公用函数库
    Node.prototype.setCss3style  = function(prop,val){
        var browser = ['webkit','moz'];
        for ( var i = 0;  i < 2;  i++){
            this.style[ browser[i] + prop.charAt(0).toUpperCase() + prop.slice(1) ] = val;
        }
        this.style[prop] = val;
    }
    function getElementPosition (el){
        var x = 0,  y = 0;
        while( el != null ){
            x += el.offsetLeft;
            y += el.offsetTop;
            el = el.offsetParent;
        }
        return  { x:x,  y:y }
    }

    //抽象类音乐播放器
    function musicPlyer(){
        this.playList = {};
        this.audio = $('audio');
        this.currentSong = 0;
    
        this.previousRandom;  
        this.random = false;
        this.repeat = false;
    }
    musicPlyer.prototype = {
        preparePlay:function(playList){
            if( !playList || typeof playList != 'object' )
                throw Error();
            this.playList = playList;
        },
        fastSeek:function(prop){
            this.audio.currentTime = this.audio.duration * prop; 
        },
        play:function(i){
            if(i)
                this.currentSong = i;
            this.audio.src = this.playList[this.currentSong].url;
            this.audio.play();
            // TODO:: 
            _playPause.children[0].src = './image/pause.png';
            _songName.textContent = this.playList[this.currentSong].name;
            _songInfo.textContent = this.playList[this.currentSong].info;

            clearInterval(t);
            var l = 0;
            if(  _songName.offsetWidth  > _songName.parentNode.offsetWidth ){
                var gundong = function(){
                    if( l == 0 ){
                        l =  - _songName.offsetWidth + _songName.parentNode.offsetWidth;   
                    }else{
                        console.log('here');
                        l = 0;
                    }
                    _songName.style.marginLeft = l + 'px'
                }
                gundong();
                t = setInterval( gundong,8000);
            }
        },
        getTime : function(i){
            var
            surplus = i,
            surplusMin = parseInt( surplus / 60 ),
            surplusSecond = parseInt( surplus % 60 );
            if ( surplusSecond < 10 ) {
                surplusSecond = '0'+surplusSecond;
            }
            return surplusMin + ":" + surplusSecond;
        },
        setVolume:function( v ){
            this.audio.volume = v;
        },
        timeUpdate:function(handler){
            var that = this;
            that.audio.addEventListener('timeupdate',function(){
                if( !this.ended ){
                    var
                    rm = '-' + that.getTime( this.duration - this.currentTime),
                    bili = this.currentTime/this.duration, 
                    cu = that.getTime(this.currentTime);

                    handler(cu,rm,bili);
                }else{
                    if( that.random ){
                        that.play(that.generateRandom());
                    }else{
                        that.nextSong();
                    }
                }
            },false);
        },
        togglePlay:function(){
            if(this.audio.paused){
                this.audio.play();
                return 1;
            }
            this.audio.pause();
            return 0;
        },
        generateRandom:function(){
            var i = Math.round( Math.random()*( this.playList.length - 1) ); 
            if( i == this.previousRandom ) {
                i++;
                if( i == this.playList.length ){
                    i = 0;
                }
            }
            this.previousRandom = i;
            this.curentSong = i;
            console.log(i);
            return i;
        },
        nextSong:function(){
            if( this.random ){
                this.play( this.generateRandom() );
            }else{
                var last = this.playList.length;
                this.currentSong = (  ++ this.currentSong  < last )?this.currentSong:0; 
                this.play();
            }
        },
        previousSong:function(){
            if( this.random ){
                this.play( this.generateRandom() );
            }else{
                this.currentSong = (  --this.currentSong  >= 0 )?this.currentSong:0; 
                this.play();
            }
        },
        toggleRepeat:function(){
            if( this.audio.getAttribute('loop') ){
                this.audio.removeAttribute('loop');
                this.repeat = false;
                _repeat.style.cssText = 'none';
            }else{
                this.audio.setAttribute('loop',true);
                this.repeat = true;
                this.random = false;
                _random.style.cssText = 'none';
                _repeat.style.cssText = 'background:#d8375b;color:white;border-radius:3px';
            }
        },
        toggleRandom:function(){
            this.random = (this.random)?false:true;
            if(this.random){
                this.repeat = false;
                this.audio.removeAttribute('loop');
                _repeat.style.cssText = 'none';
                _random.style.cssText = 'background:#d8375b;color:white;border-radius:3px';
            } else{
                _random.style.cssText = 'none';
            }
        }
    }
    
    var Ipod  = new musicPlyer()
    Ipod.preparePlay({
        0:{
            name:'C majorC majorC majorC majorC majorC majorC majorC majorC majorC major',
            url:'./songs/2.mp3',
            info:'Major C for ginusC majorC majorC majorC majorC majorC majorC majorC major'
        },
        1:{
            name:'D major',
            url:'./songs/1.mp3',
            info:'Major D for ginus'
        },
        2:{
            name:'E major',
            url:'./songs/3.mp3',
            info:'Major E for ginus'
        },
        3:{
            name:'E major',
            url:'./songs/3.mp3',
            info:'Major E for ginus'
        },
        4:{
            name:'E major',
            url:'./songs/3.mp3',
            info:'Major E for ginus'
        },
        5:{
            name:'E major',
            url:'./songs/3.mp3',
            info:'Major E for ginus'
        },
        6:{
            name:'E major',
            url:'./songs/3.mp3',
            info:'Major E for ginus'
        },
        7:{
            name:'E major',
            url:'./songs/3.mp3',
            info:'Major E for ginus'
        },
        8:{
            name:'E major',
            url:'./songs/3.mp3',
            info:'Major E for ginus'
        },
        length:9
    });

    Ipod.play(); 
    //切换歌曲 暂停
    _next.addEventListener('click',function(e){
        e.stopPropagation();
        Ipod.nextSong();
    })
    _previous.addEventListener('click',function(e){
        e.stopPropagation();
        Ipod.previousSong();
    })
    _playPause.addEventListener('click',function(e){
        e.stopPropagation();
        var  src = ( Ipod.togglePlay() )?'./image/pause.png':'./image/play.png';
        this.children[0].src = src;
    })
    //调节进度 音量
    _progress.addEventListener('click',function(e){
        e.stopPropagation();
        Ipod.fastSeek(e.layerX/this.offsetWidth);
    })
    _volum.addEventListener('click',function(e){
        e.stopPropagation();
        _volumShadow.style.width = e.layerX + 'px';
        _volumCircle.style.left = _volum.offsetLeft + e.layerX - _volumCircle.offsetWidth/2 + 'px';   
        Ipod.audio.volume =  parseFloat( (e.layerX/this.offsetWidth).toFixed(1) ); 
    })
    
    var max = _volumCircle.offsetLeft; 
    var min = _volum.offsetLeft - _volumCircle.offsetWidth/2;
    var posX = getElementPosition(_volum).x;
    var ol = _volum.offsetLeft;
    _volumCircle.addEventListener('mousedown',function(e){
        this.setCss3style('transition','none');
        _volumShadow.setCss3style('transition','none');
        function move(ev){
            var left = ev.clientX - posX + ol - e.layerX;
            var left = Math.min(max,left);
            var left = Math.max(min,left);
            _volumCircle.style.left = left +  'px'; 

            var width = left - ol + _volumCircle.offsetWidth/2; 
            _volumShadow.style.width = width + 'px';
            Ipod.audio.volume =  parseFloat( (width/_volum.offsetWidth).toFixed(1) ); 
        }
        _d.addEventListener('mousemove',move,false);

        function clear(){
            _d.removeEventListener('mouseup',clear);
            _d.removeEventListener('mousemove',move);
            _volumCircle.setCss3style('transition','.625s ease');
            _volumShadow.setCss3style('transition','.625s ease');
        }
        _d.addEventListener('mouseup',clear,false);
    })
    var pfLeft = _progressFlag.offsetLeft;
    Ipod.timeUpdate(function( c,d,e ){
        _current.innerHTML = c;
        _remind.innerHTML = d;
        _progressFlag.style.left = pfLeft + _progress.offsetWidth*e + 'px';
    })
    // 播放器自己的个性化操作
    _showPlayList.addEventListener('click',function(){
        _playList.setCss3style('transition','.3s ease');
        _main.setCss3style('transition','.3s ease');
        _main.setCss3style('transform','rotateY(90deg)');
        setTimeout(function(){
            _main.style.display = 'none';
            _playList.setCss3style('transform','rotateY(0deg)');
        },300)
    },false)

    _repeat.addEventListener('click',function(){
        Ipod.toggleRepeat();
    })
    _random.addEventListener('click',function(){
        Ipod.toggleRandom();
    })

    // _d.onselectstart = function(){return false};
    // _d.oncontextmenu = function(){return false};
}
