document.addEventListener('DOMContentLoaded', () => {

const GRID_WIDTH = 10
const GRID_HEIGHT = 20
const GRID_SIZE = GRID_WIDTH * GRID_HEIGHT
const width=10

const grid = createGrid();

let currentRotation = 0
let squares= Array.from(grid.querySelectorAll('div'))
let currentIndex=0;
let nextRandom=0;

const scoreDisplay = document.querySelector('.score-display')
  const linesDisplay = document.querySelector('.lines-score')
const SCORE=document.querySelector('.score')
  const timeLeft=document.querySelector('.remaining-time')
  document.getElementById("REM").innerHTML="60"

  var breakSound= new Audio('sounds/breaking.wav')
  var movement= new Audio('sounds/movement.wav')
  var gameMusic=new Audio('sounds/gameMusic.wav')
  var drop=new Audio('sounds/drop.wav')
  var gamesOver=new Audio('sounds/gameOver.wav')
  var levelUp=new Audio('sounds/levelUp.wav')

let interval;
  let time;
let timerId;

let score= 0;
let lines= 0;
const startBtn=document.querySelector('.button')


const colors=[
 'url(img/blue_block.png)',
 'url(img/pink_block.png)',
 'url(img/purple_block.png)',
 'url(img/peach_block.png)',
 'url(img/yellow_block.png)',

]

function createGrid()
{
   let grid= document.querySelector(".grid")
   for (let i=0;  i < GRID_SIZE; i++)
   {
   	 let gridElement = document.createElement("div")
   	 grid.appendChild(gridElement)
   }

   //for the base of the grid

  for (let i = 0; i< GRID_WIDTH; i++)
  {
  	let gridElement = document.createElement("div")
    gridElement.setAttribute("class" , "block3")
    grid.appendChild(gridElement)
  }
  
  let previousGrid=document.querySelector('.previous-grid')
  for(let i=0; i < 16; i++)
  {
  	let gridElement= document.createElement("div")
  	previousGrid.appendChild(gridElement)
  }
  return grid;
}

function control(e)
{
	if (e.keyCode=== 37)
	
		moveleft()
	
	else if(e.keyCode=== 38)
	
		rotate()
	
   else if(e.keyCode=== 39)
   
   	moveright()
   
   else if (e.keyCode=== 40)
   
   	moveDown()

}

document.addEventListener('keydown', control)

const iBrick=[
  [1, GRID_WIDTH +1 , GRID_WIDTH * 2 +1 ],
  [GRID_WIDTH, GRID_WIDTH+1, GRID_WIDTH +2],
   [1, GRID_WIDTH +1 , GRID_WIDTH * 2 +1 ],
  [GRID_WIDTH, GRID_WIDTH+1, GRID_WIDTH +2],
]


 const lBrick=[
 [1, GRID_WIDTH+1, 2],
 [1, 2, GRID_WIDTH+2],
 [2, GRID_WIDTH+2, GRID_WIDTH+1],
 [GRID_WIDTH+2, 1, GRID_WIDTH+1,],

 ]

  const oBrick = [
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1]
  ]

const IBrick=[
   [1, GRID_WIDTH +1 , GRID_WIDTH * 2 +1, GRID_WIDTH * 3 +1 ],
   [GRID_WIDTH, GRID_WIDTH+1, GRID_WIDTH +2, GRID_WIDTH+3],
   [1, GRID_WIDTH +1 , GRID_WIDTH * 2 +1 ,GRID_WIDTH * 3 +1],
   [GRID_WIDTH, GRID_WIDTH+1, GRID_WIDTH +2, GRID_WIDTH+3]
]

const tBrick = [
    [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
    [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
    [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1]
  ]



const theBricks=[iBrick, lBrick, oBrick, IBrick]

let random= Math.floor(Math.random() * theBricks.length)

let current= theBricks[random][currentRotation]

// the position of the brick ...
//as at when it shows up on the screen heading towards the buttom

let currentPosition = 4

  //draw the shape

    function draw() //0 rewatch tutorial
    {
       current.forEach(index => {
          squares[currentPosition + index].classList.add('block')
          squares[currentPosition + index].style.backgroundImage= colors[random]
       })
	   gameMusic.play()
    }

  function undraw()
  {
  	current.forEach(index=>{
  		squares[currentPosition + index].classList.remove('block')
  		squares[currentPosition +index].style.backgroundImage='none'
  	})
  }


  function moveDown()
  {
     undraw()
     currentPosition = currentPosition += GRID_WIDTH
     draw()
     freeze()
  }

  startBtn.addEventListener('click', ()=>{
if (timerId)
{
 // clearInterval(timerId)
  //timerId = null 
  //clearInterval(interval)
 // interval=-interval
   gameMusic.pause();
  gameMusic.currentTime=0

}

  else {
    //startBtn.style.display='none'
  //  gameTime()
    draw()
   // timerId = setInterval(moveDown, 1000)
    nextRandom = Math.floor(Math.random() * theBricks.length)
    displayShape()
   } 

})

function moveright() {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
    if (!isAtRightEdge) currentPosition += 1
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -= 1
    }
    draw()
  }

  //move right and prevent collisions with shapes moving right
  function moveleft() {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
    if (!isAtLeftEdge) currentPosition -= 1
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1
    }
    draw()
  }

   function restart()
  
  {
   
  for (i = 0; i < GRID_SIZE; i ++) {
    squares[i].classList=squares[i].classList.remove('block')
    squares[i].style.backgroundImage = squares[i].style.backgroundImage="none"
    clearInterval(timerId)
    }
    score = 0
     lines=0
     scoreDisplay.innerHTML = '0'
      downBtn.classList.remove('remove-clicker')
    timeLeft.classList.remove("warningTime");
    clearInterval(interval)
    gameTime()
    draw()
    timerId = setInterval(moveDown, 1000)
    nextRandom = Math.floor(Math.random() * theTetrominoes.length)
    displayShape()
  }

function freeze() {
    // if block has settled
    if (current.some(index => squares[currentPosition + index + width].classList.contains('block3') 
      || squares[currentPosition + index + width].classList.contains('taken'))) {
    drop.play()
      // make it block2
      current.forEach(index => squares[index + currentPosition].classList.add('taken'))
      // start a new tetromino falling
      random= nextRandom
      nextRandom= Math.floor(Math.random() * theBricks.length )
      current= theBricks[random][currentRotation]
      currentPosition=4
      draw()
      addScore()
      gameOver()
    }
  }
  freeze()



//function checkBrickPosition()
//{
 // const IsAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
  //const IsAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
//if(IsAtLeftEdge)
  //currentPosition +=1


//if (IsAtRightEdge)
  //currentPosition -=1
//}

function rotate()
{
 
  undraw()
  currentRotation++
    if(currentRotation === current.length)
  {
    currentRotation = 0
  }
  //checkBrickPosition()
current=theBricks[random][currentRotation]

 draw()
  movement.play()
}

function gameOver()
{
if(current.some(index => squares[index + currentPosition ].classList.contains('taken')))
{
  clearInterval(timerId)

  clearInterval(interval)
  SCORE.innerHTML="GAME OVER!!  <br> YOUR SCORE: <br>" + score;
  gameMusic.pause();
  gameMusic.currentTime=0
  
  if (score > 100)
  {
      levelUp.play()
     SCORE.innerHTML="CHAMPION!!  <br> YOUR SCORE IS: <br>" + score;
  }
  else{
      gamesOver.play()
  }
}
}


 //let nextBrickCurrentPosition = 1
//let nextCurrent
//function nextSquares()
//{
  // nextCurrent.forEach(index=>{

    //  nextSquares[currentPosition + index].classList.remove('block')
      //squares[currentPosition +index].style.backgroundImage='none'
    //})
//}

  function addScore() {
    for (currentIndex = 0; currentIndex < GRID_SIZE; currentIndex += GRID_WIDTH) {
      const row = [currentIndex, currentIndex + 1, currentIndex + 2, currentIndex + 3, currentIndex + 4, currentIndex + 5, currentIndex + 6, currentIndex + 7, currentIndex + 8, currentIndex + 9]
      if (row.every(index => squares[index].classList.contains('taken'))) {
        score += 10
        time+=10
        lines += 1
        scoreDisplay.innerHTML = score
        linesDisplay.innerHTML = lines
         if (time >10)
        {
        timeLeft.classList.remove("warningTime");
        }

        row.forEach(index => {
          squares[index].style.backgroundImage = 'none'
          squares[index].classList.remove('taken') || squares[index].classList.remove('block')
		  breakSound.play()
        })
        //splice array
        const squaresRemoved = squares.splice(currentIndex, width)
        squares = squaresRemoved.concat(squares)
        squares.forEach(cell => grid.appendChild(cell))
      }
    }
  } 
 
  function gameTime()
 {
    time=document.getElementById("REM").innerHTML="15"
  interval= setInterval(()=>
  {

  time --;
  if(time ==0)
  {
  scoreDisplay.innerHTML = 'Game Over.<br> score:' + score
  clearInterval(timerId)

  clearInterval(interval)
  }
  
  if (time<10)
  {
  timeLeft.classList.add("warningTime");
  }
  
  document.querySelector(".remaining-time").innerHTML=time

  }
 
   ,1000)
  }

})
