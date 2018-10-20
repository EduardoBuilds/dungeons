var player = (function() {
	//private
	var _x = 1;
	var _y = 1;
	var _color = '#66AA33'
	var _radius;
	return {
		setRadius:function(radius){
			_radius = radius
		},
		moveLeft:function(){
			if (map[_y][_x-1] === -1){
				_x -= 1;
			}
			camera.updateCoordinates(_x,_y)
		},
		moveRight:function(){
			if (map[_y][_x+1] === -1){
				_x += 1;
			}
			camera.updateCoordinates(_x,_y)
		},
		moveUp:function(){
			if (map[_y-1][_x] === -1){
				_y -= 1;
			}
			camera.updateCoordinates(_x,_y)
		},
		moveDown:function(){
			if (map[_y+1][_x] === -1){
				_y += 1;
			}
			camera.updateCoordinates(_x,_y)
		},
		getPosition:function(){
			return ({x:_x,y:_y})
		},
		paint:function(context,xSize,ySize){
			let pX;
			let pY;
			if (_x >= 6 && _x < map[0].length - 6){
				pX = 6
			} else if(_x >= map[0].length - 6) {
				pX = 7 + (_x - (map[0].length-6))
			} else {
				pX = _x
			}
			if (_y >= 6 && _y < map.length - 6){
				pY = 6
			} else if(_y >= map.length - 6) {
				pY = 7 + (_y - (map.length-6))
			} else {
				pY = _y
			}
			context.fillStyle = _color;
			context.beginPath();
			context.arc(pX*xSize+0.5*xSize,
						pY*ySize+0.5*ySize,
						_radius,
						0,2*Math.PI)
			context.fill()
		}
	};
})()