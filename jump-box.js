function jumpBox(){
	this.place;
	this.options={};
	this.everyBoxes=[];
};
jumpBox.prototype.scene=function(place,opions){
	$(place).append('<div class="jump-box-scene"><div class="jump-box-panel">'+
		'<div class="jump-box"></div>'+
		'<div class="jump-box"></div>'+
		'<div class="jump-box"></div>'+
		'<div class="jump-box"></div>'+
		'<div class="jump-box"></div>'+
		'<div class="jump-box"></div>'+
		'<div class="jump-box"></div>'+
		'<div class="jump-box"></div>'+
		'<div class="jump-box"></div>'+
		'<div class="jump-box"></div>'+
		'</div></div>');
	this.everyBoxes=$('.jump-box')
	$.each( this.everyBoxes, function( key, value ) {
		  $(value).css({left:  (key*2+1)*(100/21)+"%"});
	});
};

jumpBox.prototype.jump=function(move){
	this.everyBoxes.finish();//временное решение для плавности

	$.each( this.everyBoxes, function( key, value ) {
		  $(value).css({"backgroundColor":  hslToRgb(240+move[key])})//пока под вопросом *просто весело же=)
		  .animate({
		  	bottom:  move[key]*5+25+"%",
		  },750);
	});
}

function hslToRgb(h){
    var r, g, b, x;
    if (!isFinite(h)) h = 0;

    h /= 60;
    if (h < 0) h = 6 - (-h % 6);
    h %= 6;
    x =  (1 - Math.abs((h % 2) - 1));

    if 		(h < 1) r = 1, g = x, b = 0;
    else if (h < 2) r = x, g = 1, b = 0;
    else if (h < 3) r = 0, g = 1, b = x;
    else if (h < 4)	r = 0, g = x, b = 1;
    else if (h < 5)	r = x, g = 0, b = 1;
    else 			r = 1, g = 0, b = x;

    r = Math.round(r * 255)
    g = Math.round(g * 255)
    b = Math.round(b * 255)
    
    return "rgb("+r+","+g+","+b+")";
}
