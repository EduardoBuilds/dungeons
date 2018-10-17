var neighbors = []
var timer = ''

function getNeighbors(x,y){
	if (x-2 > 0){
		if (map[y][x-2] == 0 && map[y][x-1] == 0){
			neighbors.push({'x':x-2,'y':y, 'dir':'l',origin:{'x':x,'y':y}})
		}
	}
	if (x+2 < map[0].length-1){
		if (map[y][x+2] == 0 && map[y][x+1] == 0){
			neighbors.push({'x':x+2,'y':y, 'dir':'r',origin:{'x':x,'y':y}})
		}
	}
	if (y-2 > 0){
		if (map[y-2][x] == 0 && map[y-1][x] == 0){
			neighbors.push({'x':x,'y':y-2, 'dir':'u',origin:{'x':x,'y':y}})
		}
	}
	if (y+2 < map.length-1){
		if (map[y+2][x] == 0 && map[y+1][x] == 0){
			neighbors.push({'x':x,'y':y+2, 'dir':'d',origin:{'x':x,'y':y}})
		}
	}
}
function getLocalNeighbors(x,y){
	if (map[y][x+1] > 0){
		neighbors.push({x:x+1,y:y})
		map[y][x+1] = -1
	}
	if (map[y+1][x] > 0){
		neighbors.push({x:x,y:y+1})
		map[y+1][x] = -1
	}
	if (map[y][x-1] > 0){
		neighbors.push({x:x-1,y:y})
		map[y][x-1] = -1
	}
	if (map[y-1][x] >0){
		neighbors.push({x:x,y:y-1})
		map[y-1][x] = -1
	}
}

function paintMapSpace(x,y,color=null){
	if (color === null){
		ctx.fillStyle=colorPicker.getCorridorColor();
	} else {
		ctx.fillStyle=color
	}
	ctx.fillRect(x*gWidth,y*gHeight,gWidth,gHeight);
}

function paintCorridor(origin,dir){
	if (dir == 'l'){
		paintMapSpace(origin.x-1,origin.y)
		map[origin.y][origin.x-1] = objectCounter
		paintMapSpace(origin.x-2,origin.y)
		map[origin.y][origin.x-2] = objectCounter
	}
	if (dir == 'r'){
		paintMapSpace(origin.x+1,origin.y)
		map[origin.y][origin.x+1] = objectCounter
		if (origin.x+2 != map[0].length-1){
			paintMapSpace(origin.x+2,origin.y)
			map[origin.y][origin.x+2] = objectCounter
		}
	}
	if (dir == 'd'){
		paintMapSpace(origin.x,origin.y+1)
		map[origin.y+1][origin.x] = objectCounter
		if (origin.y+2 != map.length-1){
			paintMapSpace(origin.x,origin.y+2)
			map[origin.y+2][origin.x] = objectCounter
		}
	}
	if (dir == 'u'){
		paintMapSpace(origin.x,origin.y-1)
		map[origin.y-1][origin.x] = objectCounter
		paintMapSpace(origin.x,origin.y-2)
		map[origin.y-2][origin.x] = objectCounter
	}
}

function runConstruction(x,y){
	neighbors = []
	map[y][x] = objectCounter;
	paintMapSpace(x,y)
	getNeighbors(x,y)
	timer = setInterval(function(){buildMaze()},4)
}

function allNeighborsAreWalls(x,y){
	return (map[y-1][x-1] == 0 && map[y-1][x] == 0 && map[y-1][x+1] == 0 &&
		map[y][x-1] == 0 &&map[y][x+1] == 0 &&
		map[y+1][x-1] == 0 && map[y+1][x] == 0 && map[y+1][x+1] == 0 )
	
}

function combMapForValidStart(){
	colorPicker.counter++;
	objectCounter++;
	let foundValidWall = false
	let x = 1;
	let y = 1;
	//I hate using whiles!!!!
	while(!foundValidWall){
		//End of the map
		if (y == map.length - 2 && x == map[0].length -2){
			break;
		}
		if (map[y][x] == 0 && allNeighborsAreWalls(x,y)){
			foundValidWall = true
			break;
		}
		//Update the iterators
		if (x == map[0].length - 2){
			x = 1;
			y++;
		} else {
			x++;
		}
	}
	if(foundValidWall){
		runConstruction(x,y)
	} else {
		combWalls()
	}
}


function combWalls(){
	for (let i = 2; i < map.length-2; i += 2){
		for (let j=2; j < map[0].length-2; j += 2){
			//Check up and down
			if((map[i-1][j] != 0 && map[i+1][j] != 0) && ( map[i-1][j] != map[i+1][j]) ) {
				if (map[i-1][j] < map[i+1][j]){
					let key = ''+map[i-1][j]+'-'+map[i+1][j]
					if (!wallHash.hasOwnProperty(key)){
						wallHash[key] = []
					}
					wallHash[key].push({x:j,y:i})
				} else{
					let key = ''+map[i+1][j]+'-'+map[i-1][j]
					if (!wallHash.hasOwnProperty(key)){
						wallHash[key] = []
					}
					wallHash[key].push({x:j,y:i})
				}
			}
			//Check left and right
			if((map[i][j-1] != 0 && map[i][j+1] != 0) && ( map[i][j-1] != map[i][j+1]) ) {
				if (map[i][j-1] < map[i][j+1]){
					let key = ''+map[i][j-1]+'-'+map[i][j+1]
					if (!wallHash.hasOwnProperty(key)){
						wallHash[key] = []
					}
					wallHash[key].push({x:j,y:i})
				} else{
					let key = ''+map[i][j+1]+'-'+map[i][j-1]
					if (!wallHash.hasOwnProperty(key)){
						wallHash[key] = []
					}
					wallHash[key].push({x:j,y:i})
				}
			}
		}
	}
	createEntrances()
}

function createEntrances(){
	let keys = Object.keys(wallHash)
	for (let i = 0; i < keys.length; i++){
		let chosen = wallHash[keys[i]][random(0,wallHash[keys[i]].length-1)]
		paintMapSpace(chosen.x,chosen.y,'#f2e7c7')
		map[chosen.y][chosen.x] = 1
	}
	let locationX = 1;
	let locationY = 1;
	paintMapSpace(locationX,locationY,'#f2e7c7')
	map[locationY][locationX] = -1
	neighbors = []
	getLocalNeighbors(locationX,locationY)
	timer = setInterval(()=>floodFill(),4)
}

function floodFill(){
	// console.log(neighbors)
	let position;
	if (neighbors.length > 0){
		position = neighbors.shift()
		getLocalNeighbors(position.x,position.y)
		paintMapSpace(position.x,position.y,'#f2e7c7')
	} else{
		clearInterval(timer)
		console.log('Yippidy Done, dude')
	}
}

function buildMaze(){
	var position;
	if (neighbors.length > 0){
		let randomIndex = random(0,neighbors.length-1);
		position = neighbors[randomIndex];
		neighbors.splice(randomIndex,1);
		if (map[position.y][position.x] != 0){
			
		} else {
			map[position.y][position.x] = objectCounter
			getNeighbors(position.x,position.y)
			paintCorridor(position.origin,position.dir)
		}
	} else {
		clearInterval(timer)
		combMapForValidStart()
	}
}