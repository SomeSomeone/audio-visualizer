function jumpBox(){
	this.place;
	this.options={};
};
jumpBox.prototype.scene=function(place,opions){
	$(place).append('<div class="jump-box-scene"><div class="jump-box-panel">'+
		'<div class="jump-box"></div>'+
		'<div class="jump-box"></div>'+
		'<div class="jump-box"></div>'+
		'<div class="jump-box"></div>'+
		'<div class="jump-box"></div>'+
		'</div></div>');
	var children=$('.jump-box');
	console.log(children);

	$.each( children, function( key, value ) {
		  $(value).css({left:  (5+key*20)+"%"});
		  console.log(value+'<-'+key);
	});

}