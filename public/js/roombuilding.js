function makeRoom(x,y,xRange,yRange){
		let rX = xRange[random(0,xRange.length-1)]
		let rY = yRange[random(0,yRange.length-1)]
		return {top:y,bottom:y+rY,left:x,right:rX+x}
	}

function roomsCollide(roomA,roomB){
	return !(roomA.left > roomB.right || roomA.right < roomB.left
		|| roomA.top > roomB.bottom || roomA.bottom < roomB.top)
}

function paintRoom(room){
	colorPicker.counter++
	ctx.fillStyle = colorPicker.getRoomColor();
	let left = room.left*gWidth
	let right = room.right*gWidth - left
	let top = room.top*gHeight
	let bottom = room.bottom*gHeight - top
	ctx.fillRect(left,top,right,bottom)
}

function mapRoom(room){
	try{
		for (let i = room.top; i < room.bottom; i++){
			for(let j = room.left; j < room.right;j++){
				map[i][j]=objectCounter
			}
		}
	} catch(e){
		console.log(room)
	}
	objectCounter++;
}

function spawnRooms(){
	let builtRooms = []
	let lms = rooms.getLimits()
	let xRange = [];
	let yRange = [];
	let xPossible = [];
	let yPossible = [];

	//Range of Y values
	for (let i = 1; i < map.length-(lms.yMx+1); i += 2){
		if (i >= lms.yMn  && i <= lms.yMx){
			//Specifically the room dimensions
			yRange.push(i)
		}
		yPossible.push(i)
	}
	//Range of X values
	for (let i = 1; i < map[0].length - (lms.xMx); i += 2){
		if (i >= lms.xMn  && i <= lms.xMx){
			//Specifically the room dimensions
			xRange.push(i)
		}
		xPossible.push(i)
	}

	for (let i = 0; i < lms.total; i++){
		//Starting points
		let rX = xPossible[random(0,xPossible.length-1)]
		let rY = yPossible[random(0,yPossible.length-1)]
		//Define Room
		let r = makeRoom(rX,rY,xRange,yRange)
		if (builtRooms.length < 1){
			//Start queue
			builtRooms.push(r)
			// paintRoom(r)
			mapRoom(r)
		} else {
			//Test for collision
			let collision = false
			for (let j = 0; j < builtRooms.length; j++){
				if (roomsCollide(r,builtRooms[j])){
					collision = true;
				}
			}
			if(!collision) {
				builtRooms.push(r)
				// paintRoom(r)
				mapRoom(r)
			}	
		}
	}

	colorPicker.resetCounter()
	combMapForValidStart()
}

function prepareGrid(callback){
	map = []
	let rows = Math.floor(cHeight / gHeight)
	let columns = Math.floor(cWidth / gWidth)
	for (var i = 0; i < rows; i++){
		map.push([])
		for (var j = 0; j < columns;j++){
			map[i].push(0)
		}
	}
	callback()
}

function clearCanvas(){
	ctx.clearRect(0,0,cWidth,cHeight);
	ctx.fillStyle='#333333';
	ctx.rect(0,0,cWidth,cHeight);
	ctx.fill();
}


