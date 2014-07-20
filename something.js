

	var a = 1;
function unsure() {
	a += 1;
	console.log(a)
	setImmediate(function() {
		setTimeout(function( ){
			 unsure();
		},200)
	})
}

setInterval(function(){
	console.log('a')
},100)
unsure();