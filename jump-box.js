function jumpBox(){
	this.place;//where

	this.options={};//later
	
  this.countBoxes=10;
	this.everyBoxes=[];
	this.everyBoxesChildren=[];
	
  this.bottomDown;//css buttom in px

  //основные элементы
  this.context;      //основной контекст
  this.source;       //источик
  this.analyser;     //аналзатор
  this.buffer;       // realy?!

  this.jumpTimer;// set interval
  this.resultHelper;// parseInt((analyser.fftSize>>1)/10);
  window.addEventListener('resize', () => this.getSize());

  this.timeStop;
  this.timeStart;
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

	$(place).append(
		'<div class="jump-box-scene">'+
			'<div class="jump-box-panel">'+str+
				'<div class="jump-box-panel-front"></div>'+
				'<div class="jump-box-panel-right"></div>'+
				'<div class="jump-box-panel-top"></div>'+
				'<div class="jump-box-panel-bottom"></div>'+
				'<div class="jump-box-panel-left"></div>'+
				'<div class="jump-box-panel-back"></div>'+
			'</div>'+
			'<div class="jump-box-menu">'+
        '<div>'+
  				'<div onclick="pause()"><img src="icons/player_pause.png"></div>'+
  				'<div onclick="play()"><img src="icons/player_play.png"></div>'+
  				'<div onclick="rePlay()"><img src="icons/player_stop.png"></div>'+
          '<label class="uploadbutton"><div class="button" ><img src="icons/player_eject.png"></div><input type="file" accepy="audio/*"/></label>'+
        '</div>'+
        //'<div class="progress-bar"><div></div></div>'+
			'</div>'+
		'</div>'
	);

	this.everyBoxes=$(".jump-box");
	for (var i = this.everyBoxes.length - 1; i >= 0; i--) {
		this.everyBoxesChildren[i]=$(this.everyBoxes[i]).children();
	};

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  this.context = new AudioContext();
  this.analyser=this.context.createAnalyser();
  this.analyser.connect(this.context.destination);




	this.getSize();
};
jumpBox.prototype.getSize=function (){
	var translateZ=$(".front").width()/2;
	var translateZPanelShort=$(".jump-box-panel-front").outerHeight()/2;
	var translateZPanelLong=$(".jump-box-panel-front").outerWidth()-translateZPanelShort;
	this.bottomDown=(translateZPanelShort+translateZ+1)*2;
	$(".jump-box").css({bottom:this.bottomDown+"px"})
	$(".front").css({
		" -webkit-transform": "rotateY(0deg) translateZ("+translateZ+"px)",
  		"-moz-transform": "rotateY(0deg) translateZ("+translateZ+"px)",
  		"-ms-transform": "rotateY(0deg) translateZ("+translateZ+"px)",
  		"-o-transform": "rotateY(0deg) translateZ("+translateZ+"px)",
  		"transform": "rotateY(0deg) translateZ("+translateZ+"px)"})
	$(".back").css({
		" -webkit-transform": "rotateY(180deg) translateZ("+translateZ+"px)",
  		"-moz-transform": "rotateY(180deg) translateZ("+translateZ+"px)",
  		"-ms-transform": "rotateY(180deg) translateZ("+translateZ+"px)",
  		"-o-transform": "rotateY(180deg) translateZ("+translateZ+"px)",
  		"transform": "rotateY(180deg) translateZ("+translateZ+"px)"})
	$(".right").css({
		" -webkit-transform": "rotateY(90deg) translateZ("+translateZ+"px)",
  		"-moz-transform": "rotateY(90deg) translateZ("+translateZ+"px)",
  		"-ms-transform": "rotateY(90deg) translateZ("+translateZ+"px)",
  		"-o-transform": "rotateY(90deg) translateZ("+translateZ+"px)",
  		"transform": "rotateY(90deg) translateZ("+translateZ+"px)"})
	$(".left").css({
		" -webkit-transform": "rotateY(-90deg) translateZ("+translateZ+"px)",
  		"-moz-transform": "rotateY(-90deg) translateZ("+translateZ+"px)",
  		"-ms-transform": "rotateY(-90deg) translateZ("+translateZ+"px)",
  		"-o-transform": "rotateY(-90deg) translateZ("+translateZ+"px)",
  		"transform": "rotateY(-90deg) translateZ("+translateZ+"px)"})
	$(".top").css({
		" -webkit-transform": "rotateX(90deg) translateZ("+translateZ+"px)",
  		"-moz-transform": "rotateX(90deg) translateZ("+translateZ+"px)",
  		"-ms-transform": "rotateX(90deg) translateZ("+translateZ+"px)",
  		"-o-transform": "rotateX(90deg) translateZ("+translateZ+"px)",
  		"transform": "rotateX(90deg) translateZ("+translateZ+"px)"})
	$(".bottom").css({
		" -webkit-transform": "rotateX(-90deg) translateZ("+translateZ+"px)",
  		"-moz-transform": "rotateX(-90deg) translateZ("+translateZ+"px)",
  		"-ms-transform": "rotateX(-90deg) translateZ("+translateZ+"px)",
  		"-o-transform": "rotateX(-90deg) translateZ("+translateZ+"px)",
  		"transform": "rotateX(-90deg) translateZ("+translateZ+"px)"})
	$(".jump-box-panel-front").css({
		" -webkit-transform": "rotateY(0deg) translateZ("+translateZPanelShort+"px)",
  		"-moz-transform": "rotateY(0deg) translateZ("+translateZPanelShort+"px)",
  		"-ms-transform": "rotateY(0deg) translateZ("+translateZPanelShort+"px)",
  		"-o-transform": "rotateY(0deg) translateZ("+translateZPanelShort+"px)",
  		"transform": "rotateY(0deg) translateZ("+translateZPanelShort+"px)"})
	$(".jump-box-panel-back").css({
		" -webkit-transform": "rotateY(180deg) translateZ("+translateZPanelShort+"px)",
  		"-moz-transform": "rotateY(180deg) translateZ("+translateZPanelShort+"px)",
  		"-ms-transform": "rotateY(180deg) translateZ("+translateZPanelShort+"px)",
  		"-o-transform": "rotateY(180deg) translateZ("+translateZPanelShort+"px)",
  		"transform": "rotateY(180deg) translateZ("+translateZPanelShort+"px)"})
	$(".jump-box-panel-right").css({
		" -webkit-transform": "rotateY(90deg) translateZ("+translateZPanelLong+"px)",
  		"-moz-transform": "rotateY(90deg) translateZ("+translateZPanelLong+"px)",
  		"-ms-transform": "rotateY(90deg) translateZ("+translateZPanelLong+"px)",
  		"-o-transform": "rotateY(90deg) translateZ("+translateZPanelLong+"px)",
  		"transform": "rotateY(90deg) translateZ("+translateZPanelLong+"px)",
  		"width":translateZPanelShort*2})
	$(".jump-box-panel-left").css({
		" -webkit-transform": "rotateY(-90deg) translateZ("+translateZPanelLong+"px)",
  		"-moz-transform": "rotateY(-90deg) translateZ("+translateZPanelLong+"px)",
  		"-ms-transform": "rotateY(-90deg) translateZ("+translateZPanelLong+"px)",
  		"-o-transform": "rotateY(-90deg) translateZ("+translateZPanelLong+"px)",
  		"transform": "rotateY(-90deg) translateZ("+translateZPanelLong+"px)",
  		"width":translateZPanelShort*2})
	$(".jump-box-panel-top").css({
		" -webkit-transform": "rotateX(90deg) translateZ("+translateZPanelShort+"px)",
  		"-moz-transform": "rotateX(90deg) translateZ("+translateZPanelShort+"px)",
  		"-ms-transform": "rotateX(90deg) translateZ("+translateZPanelShort+"px)",
  		"-o-transform": "rotateX(90deg) translateZ("+translateZPanelShort+"px)",
  		"transform": "rotateX(90deg) translateZ("+translateZPanelShort+"px)"})
	$(".jump-box-panel-bottom").css({
		" -webkit-transform": "rotateX(-90deg) translateZ("+translateZPanelShort+"px)",
  		"-moz-transform": "rotateX(-90deg) translateZ("+translateZPanelShort+"px)",
  		"-ms-transform": "rotateX(-90deg) translateZ("+translateZPanelShort+"px)",
  		"-o-transform": "rotateX(-90deg) translateZ("+translateZPanelShort+"px)",
  		"transform": "rotateX(-90deg) translateZ("+translateZPanelShort+"px)"})
}
jumpBox.prototype.jump=function(move){
	for (var i = this.everyBoxes.length - 1; i >= 0; i--) {
		$(this.everyBoxes[i]).css({bottom:  move[i]*5+this.bottomDown+"px"});
		$(this.everyBoxesChildren[i]).css({"backgroundColor":  hslToRgb(move[i]*2.5)})//пока под вопросом *просто весело же=)
	};
}
jumpBox.prototype.loadSong=function(url){
  this.load(url);
}
jumpBox.prototype.load = function(url) {
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";
  var loader = this;
  request.onload = function() {
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + this.url);
          return;
        }
        loader.buffer = buffer;
        loader.afterLoad();
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
    request=0;
  }

  request.onerror = function() {
    alert('jumpBox: XHR error\n you can load local files');
  }
  request.send();
  /*request.onprogress = function(event) {
    $("p").text( 'Получено с сервера ' + event.loaded + ' байт из ' + event.total );
  }*/
}
jumpBox.prototype.connections=function() {
  if(!this.buffer)return;
  this.source = this.context.createBufferSource();
  this.source.buffer = this.buffer;
  this.source.connect(this.analyser);     
}

jumpBox.prototype.deconnections=function(){
  this.source.stop();
  this.source=0;
}

jumpBox.prototype.checkAudio=function(){
  if(!this.source)return;
  var streamData=new Uint8Array(this.resultHelper*10);
  var result=[];

  this.analyser.getByteFrequencyData(streamData);
  for (var i = streamData.length - 1, index=0; i >= 0; i--){
    var index=parseInt(i/this.resultHelper);
    if(result[index]<streamData[i]||!result[index])
      result[index]= streamData[i]
  }
  for (var i =  result.length - 1; i >= 0; i--) 
    result[i]=(result[i]*100)>>8;

  this.jump(result);
}
jumpBox.prototype.pause=function() {
  // сначала засекаем время потом останавливаем , ибо потом пропадает пару милисекунд.
  if(!this.source)return;
  scene.jump([0,0,0,0,0,0,0,0,0,0]);//need function
  this.timeStop = this.context.currentTime - this.timeStart;//
  this.deconnections();
}
jumpBox.prototype.play=function() {//bufer in jump box?
  if(this.source||!this.buffer)return;
  this.connections();
  this.timeStart=this.context.currentTime;
  this.source.start(0, this.timeStop % this.buffer.duration);
}
jumpBox.prototype.rePlay=function(){//need 2 function for start at 0 and new buffer
  try{
    this.pause();
  }catch(b){};
  if(!this.source)this.connections();
  this.timeStart=this.context.currentTime;
  timeStop=0;
  timeStart=this.context.currentTime;
  this.source.start(0);
}
jumpBox.prototype.afterLoad=function(){
  if(!this.buffer)return;
  this.resultHelper=parseInt((this.analyser.fftSize>>1)/10);
  this.rePlay();
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
    return "rgba("+Math.round(r * 255)+","+Math.round(g * 255)+","+Math.round(b * 255)+",0.8)";
}


    var scene;
    //инициализируем
    window.onload = function(){
    	init();
      scene.loadSong('_ghost_-_Reverie_(small_theme).mp3');
    }

    function init() {
      scene = new jumpBox();
      scene.scene(document.getElementById('some-big-div'))
    }

    var run =setInterval(function(){
      scene.checkAudio();
    },40);
   function pause() {
      scene.pause();
    }
    function play() {
      scene.play();
    }
    function rePlay() {
      scene.rePlay();
    }
    
$( "body" ).on( "change", "input[type=file]", function(event) {
    var reader = new FileReader();    
    alert("new file detected\n start loading...");
    scene.pause();
    reader.onload = function(){
      scene.loadSong(reader.result);
      reader.result=0;
    };
    reader.readAsDataURL(event.target.files[0]);
})
