( function() {
    function jq(str){
        if( typeof str == 'object' ){
            this.length = 1;
            this[0] = str;
        }else{
            var perfix = str.charAt(0);
            if(perfix == '#'){
                this.length = 1;
                this[0] = document.getElementById(str.slice(1));
            }
            if(perfix == '.'){
                var el = document.getElementsByClassName(str.slice(1));
                this.length = el.length;
                for ( var i = 0;  i < el.length;  i++){
                    this[i] = el[i];
                }
            }
        }
    }

    jq.prototype.hide = function(){
        if ( this.length == 1){
            this[0].style.display = 'none';
        }else{
            for ( var i = 0;  i < this.length;  i++){
                this[i].style.display = 'none';
            }
        }
    }

    jq.prototype.hasClass = function(str){
        var t  = this[0].className.split(' ');
        for ( var i = 0;  i < t.length;  i++){
            if( t[i] == str ){
                return true;
            }
        }
        return false;
    }

    jq.prototype.addClass = function(str){
        if( ! this.hasClass(str) ){
            this[0].className = this[0].className + ' ' + str;
        }
    }

    jq.prototype.removeClass = function(str){
        if ( this.hasClass(str) ){
            var t = this[0].className.split(' ');
            var r = [];
            for ( var i = 0;  i < t.length;  i++){
                if( t[i] !== str ){
                    r.push(t[i]);
                }
            }
            this[0].className = r.join(' ');
        }
    }

    jq.prototype.toggleClass = function(str){
        if(this.hasClass(str)){
            this.removeClass(str);
        }else{
            this.addClass(str);
        }
    }

    jq.prototype.text = function(text){
        if( this[0].textContent ){
            this[0].textContent = text;
        }else{
            //解决兼容性问题
            this[0].innerText = text;
        }
    }

    jq.prototype.getCss  = function(style){
        if( getComputedStyle ){
            return getComputedStyle(this[0],null)[style];
        }else{
            return this[0].currentStyle[style];
        }
    }

    jq.prototype.setCss  = function(obj){
        for ( var i in obj ){
            this[0].style[i] = obj[i];
        }
    }

    jq.prototype.myChildNodes = function(){
        var oldNodes = this[0].childNodes;
        var newNodes = [];
        for ( var i = 0;  i < oldNodes.length;  i++){
            if( oldNodes[i].nodeType == 3
                && oldNodes[i].nodeValue.trim() == ''
              ){
                continue;
            }
            if( oldNodes[i].nodeType == 3 ){
                oldNodes[i].nodeValue = oldNodes[i].nodeValue.trim(); 
            }
            newNodes.push( oldNodes[i] );
        }
        return newNodes;
    }

    jq.prototype.myFirstChild = function(){
        return this.myChildNodes()[0]
    }

    jq.prototype.myLastChild = function(){
        var tmp  = this.myChildNodes();
        return tmp[tmp.length - 1];
    }

    jq.prototype.getElementPosition = function(){
        var e = this[0]
        var x = 0,  y = 0;
        while( e != null ){
            x += e.offsetLeft;
            y += e.offsetTop;
            e = e.offsetParent;
        }
        return  { x:x,  y:y }
    }

    function $(str){
        return  new jq(str); 
    }
    window.$ = $; 
} )()




