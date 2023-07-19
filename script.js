const GameBoard = (()=>{
    const gameDisplay = document.querySelector(".game-board")
    let gameBoard = ["", "", "", "", "", "", "", "", ""]
    let newArr = []
    let count = 1;
    let marked = {X: [], O: []}
    let winner = 0
    round = 0;

    gameBoard.filter((item, index)=> newArr.push(index))
    const renderContents = ()=>{
        for(let i=0; i < gameBoard.length; i++){
            const mark = document.createElement("div")
            mark.setAttribute("data-index", newArr[i])
            mark.textContent = gameBoard[i]; 
            gameDisplay.appendChild(mark)
        }
    }
    const clickEvent = ()=>{ 
        gameDisplay.addEventListener("click", (event)=>{
            /*if(!gameBoard[event.target.dataset.index] && winner){
                setWinner(0)
                getPlayerMark(event)
                renderContents()
                position(event)
                checkWinner()
                Game.announceWinner(winner)
           }else */if(!gameBoard[event.target.dataset.index] && !winner){
                getPlayerMark(event)
                renderContents()
                position(event)
                checkWinner()
                Game.announceWinner(winner)
           }else{
                false;
           }
           console.log(gameBoard)
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
       if(gameBoard.some(item => Boolean(item)== true)){
        (count % 2 === 0) ?  marked.X.push(event.target.dataset.index)
       : marked.O.push(event.target.dataset.index)}
    }
    function checkWinner(){
        for(const prop in marked){
            let spots = marked[prop].sort()
            for(let spot of spots){
                let i = spots.indexOf(spot)
                if((+spots[i - 1] == 4 && (+spots[i - 2] + 4 == spot && +spots[i - 1] + 2 == spot))||
                   (+spots[i - 1] == 4 &&(+spots[i - 2] + 8 == spot && +spots[i - 1] + 4 == spot))){
                    winner = prop
                }else if(((spot == 2 || spot == 5 || spot == 8) && 
                        (+spots[i - 2] + 2 == spot && +spots[i - 1] + 1 == spot)) ||
                        (+spots[i - 2] + 6 == spot && +spots[i - 1] + 3 == spot)){
                    winner = prop
                }else if((spots[i-1] == 0 && spots[i+1] -  spots[i-1] == 4 && spots[i+2] - spots[i+1] == 4) ||
                         (spots[i-1] == 2 && spots[i+1] -  spots[i-1] == 2 && spots[i+2] - spots[i+1] == 2) ||
                         (spots[i+1] - spots[i-1] == 3 && spots[i+2] - spots[i+1] == 3)){
                    spots.splice(i, 1)
                }else if((spots[i-1] == 0 && spots[i] -  spots[i-1] == 4 && spots[i+2] - spots[i] == 4) || 
                         (spots[i-1] == 2 && spots[i] -  spots[i-1] == 2 && spots[i+2] - spots[i] == 2) ||
                         (spots[i] - spots[i-1] == 3 && spots[i+2] - spots[i] == 3)){
                    spots.splice(i + 1, 1)
                }else if(!winner && gameBoard.every(item => Boolean(item) == true)) {
                    winner = "tie"
                }
            }
        }
        return winner;
        
    }
 
    const setWinner=(num)=> winner = num
    const getWinner=()=> winner
    const setRound=(num)=> round = num
    const getRound=()=> round
    const setGameBoardSpots = (spot)=>{
        for(let i=0; i < gameBoard.length; i++){gameBoard[i] = spot}
    }
    const getGameBoardSpots =()=> gameBoard
   
    renderContents()
    clickEvent()


    return  {
                getGameBoardSpots, setGameBoardSpots, gameDisplay, 
                checkWinner, renderContents, setRound, setWinner,
                getWinner,getRound
            }
})();
const Player = (mark)=>{
    let playerMark = mark
    const setPlayerMark = (event) =>{
        while(GameBoard.gameDisplay.firstChild){
            GameBoard.gameDisplay.removeChild(GameBoard.gameDisplay.firstChild)
        }
        GameBoard.getGameBoardSpots()[event.target.dataset.index] = mark
        console.log(GameBoard.getGameBoardSpots())
    }

  
    return{setPlayerMark, playerMark}

}




const Game = (()=>{
    const winnerMark = document.querySelector("#notify h1")
    const notification = document.querySelector("#notify")

    const announceWinner = (won)=>{
        if(!won){
            notification.className = "hide"
        }else{
            winnerMark.textContent  = won
            notification.className = "show"
            console.log(`are u kidddiiing`)
        }
        // notification.className = "hide"
    }
    const clickEvents = (event)=>{
        notification.addEventListener("click", (event)=>{
            if(event.target.nodeName == "BUTTON"){
                replay()
                // GameBoard.setWinner(0)
                notification.className = "hide"
            } else {
                notification.className = "hide"
            }
            console.log(GameBoard.getWinner())
        })
    }
    function replay(){
        while(GameBoard.gameDisplay.firstChild){
            GameBoard.gameDisplay.removeChild(GameBoard.gameDisplay.firstChild)
        }
        GameBoard.setGameBoardSpots("")
        GameBoard.setWinner(0)
        GameBoard.renderContents()
        GameBoard.setRound(0)
        // notification.className = "hide"
        // console.log(GameBoard.getRound())
        // announceWinner(GameBoard.getWinner())
    }

    announceWinner(GameBoard.getWinner())
    clickEvents()
    return {announceWinner}
})()



const firstPlayer = Player("X")
const secondPlayer = Player("O")
