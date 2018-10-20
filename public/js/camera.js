var displayed = []
var camera = (function() {
	//private
	var _x=0;
	var _y=0;
	var _xG=20; //Grid dimensions
	var _yG=20; //Grid dimensions
	var _cnv = document.getElementById('theOtherCanvas')
	var _ctx;
	return {
		//public
		getCoordinates:function(){
			return {x:_x,y:_y}
		},
		updateCoordinates:function(x,y){
			if (x >= 6 && x < map[0].length - 6){
				_x = x - 6
			}
			if (y >= 6 && y < map.length - 6){
				_y = y - 6
			}
			console.log(x,y,_x,_y)
			camera.drawDisplayed()
		},
		getPaintData:function(){
			return {width:_xG,height:_yG,context:_ctx}
		},
		setPaintDimensions(width,height){
			_xG=width/13
			_yG=height/13
		},
		initialize:function(){
			_width = _cnv.width
			_height = _cnv.height
			_ctx= _cnv.getContext('2d')
			camera.setPaintDimensions(_width,_height)
			player.setRadius(0.25*_yG)
		},
		drawDisplayed:function(){
			updateDisplayed(camera.paintBackground)
		},
		paintBackground:function(){
			painter = camera.getPaintData()
			for (var i = 0; i < displayed.length; i++){
				for (var j = 0; j < displayed[0].length; j++){
					if (displayed[i][j] != 0){
						paintMapSpace(j,i,painter.width,painter.height,painter.context)
					} else {
						paintMapSpace(j,i,painter.width,painter.height,painter.context,'#000000')
					}
				}
			}
			player.paint(painter.context,painter.width,painter.height)
			camera.paintGrid()
		},
		paintGrid:function(){
			_ctx.strokeStyle = '#AAAAAA'
			for (let i = 1; i < _height/_yG; i++){
				for (let j = 1; j < _width/_xG; j++){
					_ctx.moveTo(j*_xG,0)
					_ctx.lineTo(j*_xG,_height)
					_ctx.moveTo(0,i*_yG)
					_ctx.lineTo(_width,i*_yG)
				}
			}
			_ctx.stroke()
		}
		
	};
})()

function updateDisplayed(callback=null){
	displayed = []
	let cc = camera.getCoordinates()
	for (var i = cc.y; i < cc.y + 13; i++){
		displayed.push(map[i].slice(cc.x,cc.x+13))
	}
	if(callback){
		callback()
	}
}