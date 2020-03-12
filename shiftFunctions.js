function shiftDown(){

	let lastEmptyCell = null;
	for (let i = cells.length-1; i >= 0;) {
		let cell = cells[i];

		//Functionality Done
		if(cell.hasTile){
			let tile = cell.tile;
			if(lastEmptyCell != null){
				tile.updatePosition(lastEmptyCell.posNum);
				lastEmptyCell = getCellByPos(lastEmptyCell.posNum-4);
			}

			const cellOnTheBottom = getCellByPos(tile.posNum+4);

			if(tile.posNum<13 && cellOnTheBottom.hasTile){
				if(cellOnTheBottom.tile.num == tile.num){
					if(lastEmptyCell == null){
						lastEmptyCell = tile.cell;
					}

					cellOnTheBottom.tile.removeMe();
					tile.updatePosition(cellOnTheBottom.posNum);
					tile.setNum(tile.num*2);
				}
			}
		}else{
			if(lastEmptyCell == null){
				lastEmptyCell = cell;
			}
		}
		if(cell.posNum <= 4){ // If on the _TOP_ of the grid
			lastEmptyCell = null;
		}

		// On the TOP
		if(i!=0 && i/4 < 1){
			i +=11;
		}else{
			i-=4;
		}
		/*

		 01.02.03.04
		 05.06.07.08
		 09.10.11.12
		 13.14.15.16

		Motion order
		16,12,8, 4 ,15,11,7, 3 ,14,10,6, 2 ,13,9,5, 1 : posNums
		15,11,7, 3 ,14,10,6, 2 ,13,9,5,  1 ,12,8,4, 0 : i
		
		*/
	}
}

function shiftUp(){
	let lastEmptyCell = null;
	for (let i = 0 ; i<cells.length;) {
		let cell = cells[i];

		//Functionality left
		if(cell.hasTile){
			let tile = cell.tile;
			if(lastEmptyCell != null){
				tile.updatePosition(lastEmptyCell.posNum);
				lastEmptyCell = getCellByPos(lastEmptyCell.posNum+4);
			}

			const cellOnTheTop = getCellByPos(tile.posNum-4);

			if(tile.posNum>4 && cellOnTheTop.hasTile){
				if(cellOnTheTop.tile.num == tile.num){
					if(lastEmptyCell == null){
						lastEmptyCell = tile.cell;
					}

					cellOnTheTop.tile.removeMe();
					tile.updatePosition(cellOnTheTop.posNum);
					tile.setNum(tile.num*2);
				}
			}
		}else{
			if(lastEmptyCell == null){
				lastEmptyCell = cell;
			}
		}

		if(cell.posNum >= 13){ // If on the _BOTTOM_ of the grid
			lastEmptyCell = null;
		}

		//On the bottom
		if(i!=15 && i>=12){
			i -=11;
		}else{
			i+=4;
		}
	}
}

function shiftRight(){
	let lastEmptyCell = null;
	for (let i = cells.length-1; i >= 0; i--) {
		const cell = cells[i];
		if(cell.hasTile){ // If the cell has TILE
			
			let tile = cell.tile;

			if(lastEmptyCell != null){ //If there is _EMPTY_TILE_ on the right

				tile.updatePosition(lastEmptyCell.posNum);
				lastEmptyCell = getCellByPos(lastEmptyCell.posNum-1);
				
			}
			//For combining two tiles
			const cellOnTheRight = getCellByPos(tile.posNum+1);

				if(tile.posNum%4!=0 && cellOnTheRight.hasTile){
					if(cellOnTheRight.tile.num == tile.num){
						
						if(lastEmptyCell == null){ // If LAST_EMPTY_CELL is not set
							lastEmptyCell = tile.cell; //set it
						} // else if remains the same
						
						cellOnTheRight.tile.removeMe();//Removing the _TILE_ of the _CELL_
						tile.updatePosition(cellOnTheRight.posNum);//shift _RIGHT_ on_The_Right_Cell
						tile.setNum(tile.num*2);
						//Last Empty Cell Remains the same
					}
				}

		}else{ // If the cell has __NO_TILE__
			if(lastEmptyCell == null){
				lastEmptyCell = cell;
			}
		}

		if(cell.posNum%4 == 1){ // If on the __LFET_EDGE__ of the grid
			lastEmptyCell = null;
		}
	}
}

function shiftLeft(){
	let lastEmptyCell = null;
	for (let i = 0 ; i<cells.length ; i++) {
		const cell = cells[i];
		if(cell.hasTile){ // If the cell has TILE
			
			let tile = cell.tile;

			if(lastEmptyCell != null){ //If there is _EMPTY_TILE_ on the LEFT

				tile.updatePosition(lastEmptyCell.posNum);
				lastEmptyCell = getCellByPos(lastEmptyCell.posNum+1);
				
			}
			//For combining two tiles
			const cellOnTheLeft = getCellByPos(tile.posNum-1);

				if(tile.posNum%4!=1 && cellOnTheLeft.hasTile){
					if(cellOnTheLeft.tile.num == tile.num){
						
						if(lastEmptyCell == null){ // If LAST_EMPTY_CELL is not set
							lastEmptyCell = tile.cell; //set it
						} // else if remains the same
						
						cellOnTheLeft.tile.removeMe();//Removing the _TILE_ of the _CELL_
						tile.updatePosition(cellOnTheLeft.posNum);//shift _LEFT_ on_The_Left_Cell
						tile.setNum(tile.num*2);
						//Last Empty Cell Remains the same
					}
				}

		}else{ // If the cell has __NO_TILE__
			if(lastEmptyCell == null){
				lastEmptyCell = cell;
			}
		}

		if(cell.posNum%4 == 0){ // If on the __RIGHT_EDGE__ of the grid
			lastEmptyCell = null;
		}
	}
}