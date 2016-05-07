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
		'</div></div>');
	this.everyBoxes=$('.jump-box')
	$.each( this.everyBoxes, function( key, value ) {
		  $(value).css({left:  (5+key*20)+"%"});
	});
};

jumpBox.prototype.jump=function(move){
	this.everyBoxes.finish();//временное решение для плавности
	$.each( this.everyBoxes, function( key, value ) {
		  $(value).animate({bottom:  move[key]*5+25+"%"},750);
	});
}
