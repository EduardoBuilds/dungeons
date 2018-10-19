var displayed = []
var camera = {
	_x:0,
	_y:0,
	_xG:20, //Grid dimensions
	_yG:20, //Grid dimensions
	_cv:document.getElementById('theOtherCanvas'),
	getCoordinates:function(){
		return {x:this._x,y:this._y}
	},
	getPaintData:function(){
		return {width:this._xG,height:this._yG,context:this._ctx}
	},
	initialize:function(){
		this._width = this._cv.width
		this._height = this._cv.height
		this._ctx=this._cv.getContext('2d')
	},
	drawDisplayed:function(){
		updateDisplayed(this.paintBackground)
	},
	paintBackground:function(){
		painter = camera.getPaintData()
		for (var i = 0; i < displayed.length; i++){
			for (var j = 0; j < displayed[0].length; j++){
				if (displayed[i][j] != 0){
					paintMapSpace(j,i,painter.width,painter.height,painter.context)
				}
			}
		}
		camera.paintGrid()
	},
	paintGrid:function(){
		this._ctx.strokeStyle = '#AAAAAA'
		for (let i = 1; i < this._height/this._yG; i++){
			for (let j = 1; j < this._width/this._xG; j++){
				this._ctx.moveTo(j*this._xG,0)
				this._ctx.lineTo(j*this._xG,this._height)
				this._ctx.moveTo(0,i*this._yG)
				this._ctx.lineTo(this._width,i*this._yG)
			}
		}
		this._ctx.stroke()
	}
}

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