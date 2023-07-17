const GameBoard = (()=>{
    const gameDisplay = document.querySelector(".game-board")
    const gameBoard = ["", "", "", "", "", "", "", "", ""]
    const newArr = []
    let count = 1;
    const markedX = []
    const markedO = []

    gameBoard.filter((item, index)=> newArr.push(index))
    const renderContents = ()=>{
        for(let i=0; i< gameBoard.length; i++){
            const mark = document.createElement("div")
            mark.setAttribute("data-index", newArr[i])
            mark.textContent = gameBoard[i]; 
            gameDisplay.appendChild(mark)
        }
    }
    const clickEvent = ()=>{ 
        gameDisplay.addEventListener("click", (event)=>{
           if(!gameBoard[event.target.dataset.index]){
            getPlayerMark(event)
            renderContents()
            position(event)
           } else {
             false;
           }
           console.log(markedX)
        })
    }
    function getPlayerMark(event){
        if(count % 2 !== 0){
            firstPlayer.setPlayerMark(event)
            count++
        } else if(count % 2 === 0){
            secondPlayer.setPlayerMark(event)
            count++
        }
    }
    const position=(event)=>{
       count % 2 === 0 ?  markedX.push(event.target.dataset.index)
       : markedO.push(event.target.dataset.index)
    }
   
    renderContents()
    clickEvent()
    return{gameBoard, gameDisplay}
})();
const Player = (mark)=>{
    const setPlayerMark = (event)=>{
        while(GameBoard.gameDisplay.firstChild){
            GameBoard.gameDisplay.removeChild(GameBoard.gameDisplay.firstChild)}
        GameBoard.gameBoard[event.target.dataset.index] = mark
    }
    return{setPlayerMark}

}

const firstPlayer = Player("X")
const secondPlayer = Player("O")