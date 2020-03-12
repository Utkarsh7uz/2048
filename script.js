'use strict';
let cells = new Array();
let tiles = new Array();

const cellSize = 100;
let grid;
let gridX;
let gridY;
let gridBorder = 7;

let movesCounter;
let secondsCounter;
let movesPerSecondCounter;

let numberOfEmptyCells = 0;
let movesDone = 0;
let seconds = 0;

window.onload = function (){

	grid = document.getElementById('grid');
	
	grid.style.height = cellSize * 4 + "px";
	grid.style.width = cellSize * 4 + "px";

	grid.style.borderWidth = gridBorder + "px";

	gridX = (innerWidth/2) - (cellSize*4+gridBorder*2)/2;
	gridY = (innerHeight/2) - (cellSize*4+gridBorder*2)/2;

	grid.style.left = gridX + "px";
	grid.style.top = gridY + "px";

	movesCounter = document.getElementById('moves').firstChild;
	secondsCounter = document.getElementById('seconds').firstChild;
	movesPerSecondCounter = document.getElementById('movesPerSecond').firstChild;

	for(let i = 0; i < 16 ; i++) {
		new Cell();
	}

	for (let i = 0; i < 2; i++) {
		fillRandomCell();
	}

	//Swipe controls by Hammer.js
	let hammertime = new Hammer(grid);
	hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

	hammertime.on('swipeleft', function(ev) {
		shiftTiles("Left");
	});
	hammertime.on('swiperight',function(ev) {
		shiftTiles("Right");
	});
	hammertime.on('swipeup', function(ev) {
		shiftTiles("Up");
	});
	hammertime.on('swipedown',function(ev) {
		shiftTiles("Down");
	});

}

//Button controls
document.onkeydown = function (e){
	if(e.key == "ArrowLeft"){
		shiftTiles("Left");
	}else if(e.key == "ArrowRight"){
		shiftTiles("Right");
	}else if(e.key == "ArrowUp"){
		shiftTiles("Up");
	}else if(e.key == "ArrowDown"){
		shiftTiles("Down");
	}
}

setInterval(function(){
	seconds++;
	secondsCounter.innerHTML = "Seconds : "+seconds;
	const mps = Math.floor(movesDone/seconds*100)/100;
	movesPerSecondCounter.innerHTML = "Moves/Second : " + mps;
},1000);

function reload(){
	console.log(tiles);
	for (let i = 0; i < tiles.length; i++) {
		tiles[i].removeMe();
	}
	//tiles = new Array();
	//fillRandomCell();
	//fillRandomCell();
}

function shiftTiles(dir){
	const oldState = getTilesPositions();
	if(dir == "Left"){
		shiftLeft();
	}else if(dir == "Right"){
		shiftRight();
	}else if(dir == "Up"){
		shiftUp();
	}else if(dir == "Down"){
		shiftDown();
	}
	const newState = getTilesPositions();
	if(!arraysAreEqual(newState,oldState)){
		fillRandomCell();
		movesDone++;
	}

	movesCounter.innerHTML = "Moves : "+movesDone;
}

function checkGameOver(){ // Function still in progress

	console.log("Checking Game Over");

	let _cells = cells;
	let _tiles = tiles;

	shiftUp();
	shiftDown();
	shiftLeft();
	shiftRight();

	if(tiles.length == _tiles.length){
		for (let i = 0; i < _tiles.length; i++) {
			if(tiles[i].num != _tiles[i].num){
				console.log("Game Over");
			}
		}
	}

	tiles = _tiles;
	cells = _cells;
}

function arraysAreEqual(array_1,array_2){
	for(let i=0;i<array_1[0].length;i++){
		for(let j=0;j<array_1[1].length;j++){
			if(array_1[i][j] != array_2[i][j]){
				return false;
			}
		}
	}

	return true;
}

function getTilesPositions(){
	let pos = [
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0]
	]

	let r = 0 , c = 0;

	for (let i = 0; i < cells.length; i++) {
		if(cells[i].hasTile){
			pos[r][c] = cells[i].tile.num;
		}else{
			pos[r][c] = 0;
		}
		if(c%4==3){
			c=0;
			r++;
		}else{
			c++;
		}
	}

	return pos;
}

function getCellByPos(position){
	return cells[position-1];
}

function getEmptyCellsPos(){
	let emptyCells = new Array();
	for (let i = 0; i<cells.length; i++) {
		const cell = cells[i];
		if(!cell.hasTile){
			emptyCells.push(cell.posNum);
		}
	}
	return emptyCells;
}

function fillRandomCell(){
	const emptyCells = getEmptyCellsPos();
	if(emptyCells.length > 0){
		const index = Math.floor(Math.random()*(emptyCells.length));
		new Tile(emptyCells[index]);
	}
}

function fillCell(position){
	if(!cells[position-1].hasTile){
		new Tile(position);
	}
}

function gameWon(){
	document.getElementById('alert').style.display = "block";
}

function getColorByNum(number){
	switch(number){
		case 2:
			return "burlywood"
			break;
		case 4:
			return "lightcoral"
			break;
		case 8:
			return "lightgreen"
			break;
		case 16:
			return "rgb(0, 167, 130)"
			break;
		case 32:
			return "mediumseagreen"
			break;
		case 64:
			return "rgb(19, 230, 194)"
			break;
		case 128:
			return "lightblue"
			break;
		case 256:
			return "cornflowerblue"
			break;
		case 512:
			return "aquamarine"
			break;
		case 1024:
			return "cornsilk"
			break;
		case 2048:
			return "#eee"
			break;
		default:
			return "mediumslategrey";
	}
}