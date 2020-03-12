class Cell{
	constructor(){
		this.index = cells.length;
		this.hasTile = false; //Weather a tile is on it or not
		this.tile = null;
		this.posNum = cells.length+1;
		this.dom = document.getElementsByClassName('cell')[this.posNum-1];

		this.dom.style.width = cellSize + "px";
		this.dom.style.height = cellSize + "px";

		this.x = 25 * ((this.posNum-1)%4);
		this.y = 25 * (Math.ceil(this.posNum/4)-1);

		this.dom.style.left = this.x + "%";
		this.dom.style.top = this.y + "%";

		//this.dom.innerHTML = this.posNum;

		cells.push(this);
		numberOfEmptyCells++;
	}

	addTile(tile){
		this.tile = tile;
		this.hasTile = true;
	}

	removeTile(){
		this.tile = null;
		this.hasTile = false;
	}
}