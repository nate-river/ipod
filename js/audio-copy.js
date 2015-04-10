window.onload = function(){
    var database = [
        {
            name:"小苹果",
            info:"筷子兄弟热火歌曲",
            src:'1.mp3',
            fengmian:"fengmian.png"
        },
        {
            name:"不知",
            info:"轻音乐",
            src:'2.mp3',
            fengmian:"fengmian.png"
        },
        {
            name:"江南style",
            info:"韩国鸟叔神曲",
            src:'3.mp3',
            fengmian:"fengmian2.png"
        }
    ];

    var d = document;
    var audio = d.getElementById('audio');
    var el = d.getElementById('iphone');
    var rm = d.getElementById('rm');
    var cu = d.getElementById('cu');
    var j_biaoshi = d.getElementById("j-biaoshi");
    rm.textContent = (-audio.duration/60).toFixed(2);
    audio.play();
    //audio.fastSeek(210);

    var i = 1;
    var myGetTime = function(i){
        var surplus = i;
        var surplusMin = parseInt(surplus/60);
        var surplusSecond = parseInt(surplus%60);
        if (surplusSecond < 10 ) {
            surplusSecond = '0'+surplusSecond;
        };
        return {m:surplusMin,s:surplusSecond};
    }

    var changeSong  = function(audio){
        audio.src = './songs/' + i + '.mp3';
        audio.play();
        d.getElementById('m-name').textContent = database[i-1].name;
        d.getElementById('m-info').textContent = database[i-1].info;
        d.getElementById('fengmian').src = './image/'+ database[i-1].fengmian;
    }

    var timeUpdateHandeler = function(){
        if(!this.ended){
            var t = myGetTime(this.duration - this.currentTime);
            rm.innerHTML = "-" + t.m + ":" + t.s;
            j_biaoshi.style.marginLeft = (this.currentTime/this.duration)*445 +'px'; 
            var t = myGetTime(this.currentTime);
            cu.innerHTML =  t.m + ":" + t.s;
        }else{
            if(i==3) i=0;
            i++;
            changeSong(this);
        }
    } 
    audio.addEventListener('timeupdate',timeUpdateHandeler,false)

    d.getElementById('next').addEventListener('click',function(){
        if(i==3) i = 0;
        i++;
        var audio = document.getElementById('audio')
        changeSong(audio);
    },false)
    
    d.getElementById('pre').addEventListener('click',function(){
        if(i <= 1) i = 2;
        i--;
        var audio = document.getElementById('audio')
        changeSong(audio);
    },false)

    d.getElementById('play').addEventListener('click',function(){
        var audio = d.getElementById('audio');
        if(audio.paused){
            this.src = './image/p.png'
            audio.play();
        }else{
            this.src = './image/play.png'
            audio.pause();
        }
    },false)
    
    d.getElementsByClassName('y')[0].addEventListener('click',function(e){
        var x = getComputedStyle(d.getElementById('iphone'),null).marginLeft;  
        var x = parseInt(x)+102;
        var a = parseFloat( (e.clientX-x)/445 ) ;
        $zhezhao.setCss( {width:e.clientX - x + 5 + 'px'} );
        d.getElementsByClassName('y-biaoshi')[0].style.left = e.clientX -x +'px';
        var audio = d.getElementById('audio');
        audio.volume = a; 
    },false);
    

    d.getElementById('y-biaoshi').addEventListener('click',function(e){
        e.stopPropagation();
    },false)
    var audio = d.getElementById('audio');


    window.onresize = function(){
        pos = $biaoshi.getElementPosition().x + right;
    }

    var $biaoshi = $('#y-biaoshi');
    var pos = $biaoshi.getElementPosition().x;
    var max_right = $('.y')[0].offsetWidth - $biaoshi[0].offsetWidth/2;
    var min_right = -$biaoshi[0].offsetWidth/2; 
    var right;
    var $zhezhao = $('.zhezhao');

    $biaoshi[0].onmousedown = function(e){
        var thatE = e;
        document.onmousemove = function(e){
            right = pos - e.clientX + thatE.layerX;  
            if(right > max_right){
                right = max_right;
            }
            if(right < min_right){
                right = min_right;
            }
            $biaoshi.setCss({right:right+'px'});
            var w = $('.y')[0].offsetWidth - right + 'px';    
            $zhezhao.setCss( {width:w} );
        }
    }
    document.onmouseup = function(){
        this.onmousemove = null;
    }

    // var $el = $('#y-biaoshi');
    // var pos = $el.getElementPosition().x + parseInt($el.getCss('width'));
    // var $zhezhao = $('.zhezhao');
    // var max_right =  $('.y')[0].offsetWidth - $el[0].offsetWidth/2;
    // var min_right =  - $el[0].offsetWidth/2;
    // var right = 0;


    // window.onresize = function(){
    //     var $el = $('#y-biaoshi');
    //     pos = $el.getElementPosition().x + $el[0].offsetWidth + right;
    //     console.log(pos);
    // }

    // d.getElementById('y-biaoshi').addEventListener('mousedown',function(e){
    //     e.stopPropagation();
    //     e.preventDefault();
    //     var that = this;
    //     var thatE = e;
    //     document.onmousemove = function(e){
    //         right = pos - e.clientX - (that.offsetWidth - thatE.layerX);
    //         if(right < min_right){
    //             right = min_right;
    //         }
    //         if(right > max_right ){
    //             right = max_right;
    //         }
    //         that.style.right = right + 'px';
    //         e.preventDefault();
    //         e.stopPropagation();
    //         // var width = $('.y')[0].offsetWidth - right - that.offsetWidth/2 + 'px';  
    //         // $zhezhao.setCss({width:width});
    //         // var a = $('.y')[0].offsetWidth  - right - $el[0].offsetWidth/2;
    //         // audio.volume =  a/$('.y')[0].offsetWidth; 
    //     }
    //     document.onmouseup = function(e){
    //         this.onmousemove = null;
    //         this.onmouseup = null;
    //         e.preventDefault();
    //         e.stopPropagation();
    //     }
    // },false);

    
    d.getElementById('c').addEventListener('click',function(e){
        var x = getComputedStyle(d.getElementById('iphone'),null).marginLeft;  
        var x = parseInt(x)+102;
        var j = d.getElementById('j-biaoshi');
        j.style.marginLeft = e.clientX - x + 'px';

        var audio = d.getElementById('audio');
        var seek = parseInt( ( (e.clientX - x)/445 )*audio.duration);
        audio.fastSeek(seek);
    },false)

    d.getElementById('j-biaoshi').addEventListener('click',function(e){
        e.stopPropagation();
    })
    
    d.getElementById('j-biaoshi').addEventListener('mousedown',function(e){
        e.stopPropagation();
        e.preventDefault();
        var that = this;
        var x = getComputedStyle(d.getElementById('iphone'),null).marginLeft;  
        var x = parseInt(x)+102;
        var x = e.layerX + x;
        var left;
        document.onmousemove = function(e){
            left = e.clientX - x;
            that.style.marginLeft = left + 'px';
            e.preventDefault();
            e.stopPropagation();
        }
        document.onmouseup = function(e){
            var audio = d.getElementById('audio');
            audio.fastSeek( parseFloat(left/445)*audio.duration); 
            this.onmousemove = null;
            this.onmouseup = null;
            e.preventDefault();
            e.stopPropagation();
        }

    },false);
}

// audio.setAttribute('loop','true');
// console.log(audio.currentTime);
// console.log(audio.duration);
// audio.defaultPlaybackRate = 2;
// newAudio.setAttribute('autoplay','true');
// newAudio.setAttribute('preload','true');