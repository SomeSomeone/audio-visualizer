function jumpBox(){
	this.place;
	this.options={};
	this.countBoxes=10;
	this.everyBoxes=[];
	this.everyBoxesChildren=[];
};
jumpBox.prototype.scene=function(place,opions){
	var str='';
	var size=(100/(this.countBoxes*2+1));
	for (var i = 0; i < this.countBoxes; i++) 
		str+='<div class="jump-box" style="left:'+(i*2+1)*size+'%;width:'+size+'%">'+
		'<div class="front"></div>'+
		'<div class="right"></div>'+
		'<div class="top"></div>'+
		'<div class="bottom"></div>'+
		'<div class="left"></div>'+
		'<div class="back"></div>'+
		'</div>';

	$(place).append('<div class="jump-box-scene"><div class="jump-box-panel">'+str+'</div></div>');
	
	//3D
	translateZ=$(".front").width()/2;
	$(".front").css({
		" -webkit-transform": "rotateY(0deg) translateZ("+translateZ+"px)",
  		"-moz-transform": "rotateY(0deg) translateZ("+translateZ+"px)",
  		"-ms-transform": "rotateY(0deg) translateZ("+translateZ+"px)",
  		"-o-transform": "rotateY(0deg) translateZ("+translateZ+"px)",
  		"transform": "rotateY(0deg) translateZ("+translateZ+"px)"
	})
	$(".back").css({
		" -webkit-transform": "rotateY(180deg) translateZ("+translateZ+"px)",
  		"-moz-transform": "rotateY(180deg) translateZ("+translateZ+"px)",
  		"-ms-transform": "rotateY(180deg) translateZ("+translateZ+"px)",
  		"-o-transform": "rotateY(180deg) translateZ("+translateZ+"px)",
  		"transform": "rotateY(180deg) translateZ("+translateZ+"px)"
	})
	$(".right").css({
		" -webkit-transform": "rotateY(90deg) translateZ("+translateZ+"px)",
  		"-moz-transform": "rotateY(90deg) translateZ("+translateZ+"px)",
  		"-ms-transform": "rotateY(90deg) translateZ("+translateZ+"px)",
  		"-o-transform": "rotateY(90deg) translateZ("+translateZ+"px)",
  		"transform": "rotateY(90deg) translateZ("+translateZ+"px)"
	})
	$(".left").css({
		" -webkit-transform": "rotateY(-90deg) translateZ("+translateZ+"px)",
  		"-moz-transform": "rotateY(-90deg) translateZ("+translateZ+"px)",
  		"-ms-transform": "rotateY(-90deg) translateZ("+translateZ+"px)",
  		"-o-transform": "rotateY(-90deg) translateZ("+translateZ+"px)",
  		"transform": "rotateY(-90deg) translateZ("+translateZ+"px)"
	})
	$(".top").css({
		" -webkit-transform": "rotateX(90deg) translateZ("+translateZ+"px)",
  		"-moz-transform": "rotateX(90deg) translateZ("+translateZ+"px)",
  		"-ms-transform": "rotateX(90deg) translateZ("+translateZ+"px)",
  		"-o-transform": "rotateX(90deg) translateZ("+translateZ+"px)",
  		"transform": "rotateX(90deg) translateZ("+translateZ+"px)"
	})
	$(".bottom").css({
		" -webkit-transform": "rotateX(-90deg) translateZ("+translateZ+"px)",
  		"-moz-transform": "rotateX(-90deg) translateZ("+translateZ+"px)",
  		"-ms-transform": "rotateX(-90deg) translateZ("+translateZ+"px)",
  		"-o-transform": "rotateX(-90deg) translateZ("+translateZ+"px)",
  		"transform": "rotateX(-90deg) translateZ("+translateZ+"px)"
	})
	this.everyBoxes=$(".jump-box");
	for (var i = this.everyBoxes.length - 1; i >= 0; i--) {
		this.everyBoxesChildren[i]=$(this.everyBoxes[i]).children();
	};

};

jumpBox.prototype.jump=function(move){
	this.everyBoxes.finish();//временное решение для плавности

for (var i = this.everyBoxes.length - 1; i >= 0; i--) {
	$(this.everyBoxes[i]).animate({bottom:  move[i]*5+25+"%",},500);
	$(this.everyBoxesChildren[i]).css({"backgroundColor":  hslToRgb(240+move[i])})//пока под вопросом *просто весело же=)
};
	/*$.each( this.everyBoxes, function( key, value ) {

		  $(this.everyBoxesChildren[key]).css({"backgroundColor":  hslToRgb(240+move[key])})//пока под вопросом *просто весело же=)
		  $(value).animate({
		  	bottom:  move[key]*5+25+"%",
		  },750);
	});
*/
}

function hslToRgb(h){
    var r, g, b, x;
    if (!isFinite(h)) h = 0;
    h /=60;
    x =  (1 - Math.abs((h % 2) - 1));
    if 		(h < 1) r = 1, g = x, b = 0;
    else if (h < 2) r = x, g = 1, b = 0;
    else if (h < 3) r = 0, g = 1, b = x;
    else if (h < 4)	r = 0, g = x, b = 1;
    else if (h < 5)	r = x, g = 0, b = 1;
    else 			r = 1, g = 0, b = x;
    return "rgba("+Math.round(r * 255)+","+Math.round(g * 255)+","+Math.round(b * 255)+",0.9)";
}


    var scene;
    scene = new jumpBox();
    scene.scene(document.getElementById('some-big-div'));//, {/*some options*/ });
    // создаем аудио контекст
    
    //основные элементы
    var context;      //основной контекст
    var source;       //источик
    var analyser;     //аналзатор
    //помошники
    var bufferLoader; //для загрузки
    var streamData;   //свеже взятые данные с потока
    var result;       //подсчитанные данные
    var resultHelper;
    var urlCatalog;   //все ссылки
    var timeStop;     //время остановки
    var timeStart;    //время начала

    //инициализируем
    window.onload = init;
    function init() {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      context = new AudioContext();
      analyser=context.createAnalyser();
      analyser.connect(context.destination)
      
      urlCatalog=['_ghost_-_Reverie_(small_theme).mp3'];
      
      bufferLoader = new BufferLoader(context,urlCatalog[0]);
      bufferLoader.load();
    }

    function connections(bufferList) {
      source = context.createBufferSource();
      source.buffer = bufferList;
      source.connect(analyser);     
    }
    function deconnections(){
      source.stop();
      source=0;
    }

    var run =setInterval(checkAudio,20);
    function checkAudio(){
      if(!source)return;
      streamData=new Uint8Array(resultHelper*10);
      result=[];

      analyser.getByteFrequencyData(streamData);
      for (var i = streamData.length - 1, index=0; i >= 0; i--){
        index=parseInt(i/resultHelper);
        /*
          //два варанта определения частоты 
          //по среднему 
          //result[index]?result[index]+= streamData[i]:result[index]=streamData[i];
          //по максмальному*/
        if(result[index]<streamData[i]||!result[index]){result[index]= streamData[i];}
      }
      for (var i =  result.length - 1; i >= 0; i--) {
        //result[i]=(result[i]*25/resultHelper)>>6 ;// (result*100)/(resultHelper*256) ->((result*25)/resultHelper)>>6
        result[i]=(result[i]*100)>>8;
      };
      scene.jump(result);
    }
    function BufferLoader(context, url) {
      this.context = context;
      this.url = url;
      this.bufferList = 0;
      this.loadCount = 0;
    }
    BufferLoader.prototype.load = function() {
      var request = new XMLHttpRequest();
      request.open("GET", this.url, true);
      request.responseType = "arraybuffer";

    
      var loader = this;

      request.onload = function() {
        // Asynchronously decode the audio file data in request.response
        loader.context.decodeAudioData(
          request.response,
          function(buffer) {
            if (!buffer) {
              alert('error decoding file data: ' + this.url);
              return;
            }
            loader.bufferList = buffer;
            console.log('I do it!');
            console.log(buffer);

            rePlay(loader.bufferList);
            
          },
          function(error) {
            console.error('decodeAudioData error', error);
          }
        );
      }

      request.onerror = function() {
        alert('BufferLoader: XHR error');
      }
      request.send();
      request.onprogress = function(event) {
        $("p").text( 'Получено с сервера ' + event.loaded + ' байт из ' + event.total );
      }
    }


    function pause() {

      // сначала засекаем время потом останавливаем , ибо потом пропадает пару милисекунд.
      if(!source)return;
      scene.jump([0,0,0,0,0,0,0,0,0,0]);
      timeStop += context.currentTime - timeStart-0.4;
      deconnections();
    }
    function play(buffer) {
      buffer=buffer||bufferLoader.bufferList;
      if(source||!buffer)return;
      connections(buffer);
      timeStart=context.currentTime;
      source.start(0, timeStop % buffer.duration);
      
    }
    function rePlay(buffer) {
      buffer=buffer||bufferLoader.bufferList;
      if(!buffer)return;
      if(source)deconnections();
      
      resultHelper=parseInt((analyser.fftSize>>1)/10);
      connections(buffer);
      timeStop=0;
      timeStart=context.currentTime;
      source.start(0);
    }