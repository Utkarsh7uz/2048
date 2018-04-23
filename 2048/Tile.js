class Tile{
	constructor(posNum){

		this.posNum = posNum;
		this.index = cells.length;		

		this.cell = cells[posNum-1];
		this.cell.addTile(this);
		
		this.num = Math.random() > 0.1 ? 2 : 4;

		const span = document.createElement('span');
		
		span.className = "tile";
		span.style.width = cellSize + "px";
		span.style.height = cellSize + "px";

		span.style.backgroundColor = getColorByNum(this.num);

		span.style.left = this.cell.x + "%";
		span.style.top = this.cell.y + "%";

		grid.appendChild(span);
		this.dom = span;

		const p = document.createElement('p');
		p.innerHTML = this.num ;
		p.className = "tileP";

		span.appendChild(p);
		tiles.push(this);

		this.p = p;

		numberOfEmptyCells--;
	}
	removeMe(){
		this.cell.removeTile();
		this.dom.style.transform = "scale(0)";
		grid.removeChild(this.dom);
		tiles.pop(this.index);

		numberOfEmptyCells++;
	}
	updatePosition(position) {
		this.posNum = position;
		this.cell.removeTile();

		this.cell = cells[this.posNum-1];
		this.cell.addTile(this);

		this.dom.style.left = this.cell.x + "%";
		this.dom.style.top = this.cell.y + "%";
	}
	setNum(num){
		this.num = num;
		this.p.innerHTML = this.num;
		this.dom.style.backgroundColor = getColorByNum(this.num);

		if(this.num == 2048){
			gameWon();
		}
	}
}