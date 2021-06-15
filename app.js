document.addEventListener('DOMContentLoaded',() =>{
	const gridDisplay= document.querySelector('.grid')
	const scoreDisplay= document.getElementById('score')
	const resultDisplay= document.getElementById('result')
	const width=4;
	let squares=[]
	let score=0
	let colors=new Map()
	colors[0]="#e0ffff"
	colors[2]="#D2AADA"
	colors[4]="#AD7FB9"
	colors[8]="#8F4C9F"
	colors[16]="#693476"
	colors[32]="#E387AD"
	colors[64]="#D16B9B"
	colors[128]="#9D437A"
	colors[256]="#5E1C47"
	colors[512]="#E0727F"
	colors[1024]="#D05668"
	colors[2048]="#CB0030"
	colors[4096]="#900029"
	colors[8019]="#5DA6C2"
	colors[16384]="#4187AB"
	colors[32768]="#286D89"
	colors[65536]="#135A79"
	colors[131072]="#0B2330"

	function createBoard() {
		for (let i = 0; i < width*width; i++) {
			square=document.createElement('div')
			square.innerHTML=''
			gridDisplay.appendChild(square)
			squares.push(square)
		}
		generate()
		generate()
	}

	createBoard()

	function generate()
	{
		let RandomNumer=Math.floor(Math.random() * 16)
		if(squares[RandomNumer].innerHTML == '')
		{
			squares[RandomNumer].innerHTML=2;
			checkForGameOver()
		}
		else
			generate();

		setColor()
	}


	function moveRight()
	{
		for (let i = 0; i < 16; i++) {
			if(i%4 === 0)
			{
				let totalone= squares[i].innerHTML==''?'0':squares[i].innerHTML
				let totaltwo= squares[i+1].innerHTML==''?'0':squares[i+1].innerHTML
				let totalthree= squares[i+2].innerHTML==''?'0':squares[i+2].innerHTML
				let totalfour= squares[i+3].innerHTML==''?'0':squares[i+3].innerHTML

				let row=[parseInt(totalone),parseInt(totaltwo),parseInt(totalthree),parseInt(totalfour)]
				

				let filteredrow=row.filter(num => num)
				

				let missing=4-filteredrow.length
				let zeroes=Array(missing).fill(0)
				

				let newrow=zeroes.concat(filteredrow)
				

				squares[i].innerHTML= newrow[0]==0?'':newrow[0];
				squares[i+1].innerHTML= newrow[1]==0?'':newrow[1];
				squares[i+2].innerHTML= newrow[2]==0?'':newrow[2];
				squares[i+3].innerHTML= newrow[3]==0?'':newrow[3];
				

			}

		}
		setColor()
	}
	 


	 function moveLeft()
	{
		for (let i = 0; i < 16; i++) {
			if(i%4 === 0)
			{
				let totalone= squares[i].innerHTML==''?'0':squares[i].innerHTML
				let totaltwo= squares[i+1].innerHTML==''?'0':squares[i+1].innerHTML
				let totalthree= squares[i+2].innerHTML==''?'0':squares[i+2].innerHTML
				let totalfour= squares[i+3].innerHTML==''?'0':squares[i+3].innerHTML
				let row=[parseInt(totalone),parseInt(totaltwo),parseInt(totalthree),parseInt(totalfour)]
				

				let filteredrow=row.filter(num => num)
				
				let missing=4-filteredrow.length
				let zeroes=Array(missing).fill(0)
				
				let newrow=filteredrow.concat(zeroes)

				squares[i].innerHTML= newrow[0]==0?'':newrow[0];
				squares[i+1].innerHTML= newrow[1]==0?'':newrow[1];
				squares[i+2].innerHTML= newrow[2]==0?'':newrow[2];
				squares[i+3].innerHTML= newrow[3]==0?'':newrow[3];
				
				

			}
		}
		setColor()
	}

	function moveDown()
	{
		for (let i = 0; i < 4; i++) {
			let totalone= squares[i].innerHTML==''?'0':squares[i].innerHTML
			let totaltwo= squares[i+ (width)].innerHTML==''?'0':squares[i+ (width)].innerHTML
			let totalthree= squares[i+ (2*width)].innerHTML==''?'0':squares[i+ (2*width)].innerHTML
			let totalfour= squares[i+ (3*width)].innerHTML==''?'0':squares[i+ (3*width)].innerHTML

			let col=[parseInt(totalone),parseInt(totaltwo),parseInt(totalthree),parseInt(totalfour)]

			let filteredcol=col.filter(num=>num)

			let missing=4-filteredcol.length
			let zeroes=Array(missing).fill(0)

			let newCol=zeroes.concat(filteredcol)

			squares[i].innerHTML= newCol[0]==0?'':newCol[0];
			squares[i+ (width)].innerHTML= newCol[1]==0?'':newCol[1];
			squares[i+ (2*width)].innerHTML= newCol[2]==0?'':newCol[2];
			squares[i+ (3*width)].innerHTML= newCol[3]==0?'':newCol[3];
			
		}
		setColor()
	}
	function moveUp()
	{
		for (let i = 0; i < 4; i++) {
			let totalone= squares[i].innerHTML==''?'0':squares[i].innerHTML
			let totaltwo= squares[i+ (width)].innerHTML==''?'0':squares[i+ (width)].innerHTML
			let totalthree= squares[i+ (2*width)].innerHTML==''?'0':squares[i+ (2*width)].innerHTML
			let totalfour= squares[i+ (3*width)].innerHTML==''?'0':squares[i+ (3*width)].innerHTML

			let col=[parseInt(totalone),parseInt(totaltwo),parseInt(totalthree),parseInt(totalfour)]

			let filteredcol=col.filter(num=>num)

			let missing=4-filteredcol.length
			let zeroes=Array(missing).fill(0)

			let newCol=filteredcol.concat(zeroes)

			squares[i].innerHTML= newCol[0]==0?'':newCol[0];
			squares[i+ (width)].innerHTML= newCol[1]==0?'':newCol[1];
			squares[i+ (2*width)].innerHTML= newCol[2]==0?'':newCol[2];
			squares[i+ (3*width)].innerHTML= newCol[3]==0?'':newCol[3];
			
		}
		setColor()
	}

	function combineRow()
	{
		for (let i = 0; i < 15; i++) {
			
			if(squares[i].innerHTML==squares[i+1].innerHTML)
			{
				let combinedTotal=parseInt(squares[i].innerHTML==''?0:squares[i].innerHTML)+parseInt(squares[i+1].innerHTML==''?0:squares[i+1].innerHTML)
				squares[i].innerHTML=combinedTotal
				squares[i+1].innerHTML=0;
				score+=combinedTotal
				scoreDisplay.innerHTML=score
				
			}
		}
		setColor()
		checkForWin()
	}

	function combineCol()
	{
		for (let i = 0; i < 12; i++) {
			
			if(squares[i].innerHTML==squares[i+width].innerHTML)
			{
				let combinedTotal=parseInt(squares[i].innerHTML==''?'0':squares[i].innerHTML)+parseInt(squares[i+width].innerHTML==''?'0':squares[i+width].innerHTML)
				squares[i].innerHTML=combinedTotal
				squares[i+width].innerHTML=0;
				score+=combinedTotal
				scoreDisplay.innerHTML=score
				
			}
		}
		setColor()
		checkForWin()
	}

	function control(e)
	{
		if(e.keyCode===39)
		{
			keyRight()
		}
		else if(e.keyCode===37)
		{
			keyLeft()
		}
		else if(e.keyCode===38)
		{
			keyUp()
		}
		else if(e.keyCode===40)
		{
			keyDown()
		}
	}
	 document.addEventListener('keyup',control)
	function keyRight()
	{
		moveRight()
		combineRow()
		moveRight()
		generate()
	}
	function keyLeft()
	{
		moveLeft()
		combineRow()
		moveLeft()
		generate()
	}

	function keyDown()
	{
		moveDown()
		combineCol()
		moveDown()
		generate()
	}

	function keyUp()
	{
		moveUp()
		combineCol()
		moveUp()
		generate()
	}

	function checkForWin()
	{
		for (let i = 0; i < 16; i++) {
			if(squares[i].innerHTML==2048)
			{
				resultDisplay.innerHTML='You Win!'
				document.removeEventListener('keyup',control)
			}
		}
	}

	function checkForGameOver()
	{
		let zeroes=0
		for (let i = 0; i < 16; i++) {
			if(squares[i].innerHTML==0)
			{
				zeroes++;
			}
		}
		if(zeroes===0)
		{
			resultDisplay.innerHTML='You Lose!'
			document.removeEventListener('keyup',control)
		}
	}


	document.getElementById('bt').onclick=function(){
		restart()
	}
	function restart()
	{
		for (let i = 0; i < squares.length; i++) {
			squares[i].innerHTML=''
		}
		score=0;
		scoreDisplay.innerHTML=score;
		setColor()
		document.addEventListener('keyup',control)
		generate()
		generate()
		resultDisplay.innerHTML=''
	}

	function setColor()
	{
		for (let i = 0; i < 16; i++) {
			squares[i].style.backgroundColor=colors[parseInt(squares[i].innerHTML==''?'0':squares[i].innerHTML)]
		}
		
	}
})