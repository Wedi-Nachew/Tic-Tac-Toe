const GameBoard = (()=>{
    const gameDisplay = document.querySelector(".game-board")
    const gameBoard = ["", "", "", "", "", "", "", "", ""]
    const newArr = []
    let count = 1;

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
            getPlayerMark(event)
            renderContents()
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
   
    renderContents()
    clickEvent()

    return{gameBoard, gameDisplay}
})();
const Player = (mark)=>{
    let count = 1;
    const setPlayerMark = (event)=>{
        while(GameBoard.gameDisplay.firstChild){
            GameBoard.gameDisplay.removeChild(GameBoard.gameDisplay.firstChild)}
            GameBoard.gameBoard[event.target.dataset.index] = mark       
    }



    return{setPlayerMark}

}

const firstPlayer = Player("X")
const secondPlayer = Player("O")