var tileTypes = [
				{
					//Wall
					passable:false,
					color:'#000000'
				},
				{
					//Corridor
					passable:false,
					color:'#ffffff'
				},
				{
					//Water
					passable:false,
					color:'#2244CC'

				}
			]

var rooms = {
	_limit:600,
	_xMin:3,
	_yMin:3,
	_xMax:9,
	_yMax:9,
	getLimits:function(){
		return {
			total:this._limit,
			xMx:this._xMax,
			yMx:this._yMax,
			xMn:this._xMin,
			yMn:this._yMin}
	}
}

var colorPicker =  {
	counter:0,
	corridorList:['#CEB3AB','#B49A67','#A6808C','#E7EFC5','#A3C4BC','#F2E7C9'],
	roomList:['#6200B3','#B43E8F','#BAA5FF','#034748','#44BBA4','#E94F37'],
	getRoomColor:function(){
		return this.roomList[this.counter % this.roomList.length]
	},
	getCorridorColor:function(){
		return this.corridorList[this.counter % this.corridorList.length]
	},
	resetCounter:function(){
		this.counter = 0
	}
} 

var camera = {
	_x:0,
	_y:0,
	getCoordinates:function(){
		return {x:this._x,y:this._y}
	}
}