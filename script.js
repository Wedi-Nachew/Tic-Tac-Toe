const GameBoard = (()=>{
    const gameDisplay = document.querySelector(".game-board")
    let gameBoard = ["", "", "", "", "", "", "", "", ""]
    let newArr = []
    let count = 1;
    let marked = {X: [], O: []}
    let winner = 0

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
            if(Ai.getMode() && !winner){
                getPlayerMark(event)
                getAiMark(event)
                renderContents()
                position(event)
                checkWinner()
                Game.announceWinner(winner)
                // console.log(marked)
            }else if(!gameBoard[event.target.dataset.index] && !winner && !Ai.getMode()){
                getPlayerMark(event)
                renderContents()
                position(event)
                checkWinner()
                Game.announceWinner(winner)
           }else{
                false;
           }
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

    function getAiMark(event){
            Ai.setAIMark(event)
            count++
    }

    
    const position=(event)=>{
       if(Ai.getMode() && !winner){
            marked.X.push(event.target.dataset.index)
            marked.O.push(Ai.getAispot())
        }else if(!Ai.getMode() && (count % 2 === 0)){
            marked.X.push(event.target.dataset.index)
        }else if(!Ai.getMode() && (count % 2 !== 0)){
            marked.O.push(event.target.dataset.index)
        }
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
    const setCount=(num)=> count = num
    const setGameBoardSpots = (spot)=>{
        for(let i=0; i < gameBoard.length; i++){gameBoard[i] = spot}
    }
    const getMarkedSpots=()=> marked
    const resetMarkedSpots=()=> {
        for(prop in marked){
            marked[prop] = []
        }
    }
    const getGameBoardSpots =()=> gameBoard
   
    renderContents()
    clickEvent()
   

    return  {
                getGameBoardSpots, setGameBoardSpots, gameDisplay,setCount, getMarkedSpots,
                renderContents, setWinner,getWinner,resetMarkedSpots, position, checkWinner, marked
            }
})();

const Player = (mark)=>{
    let playerMark = mark

    const setPlayerMark = (event) =>{
        while(GameBoard.gameDisplay.firstChild){
            GameBoard.gameDisplay.removeChild(GameBoard.gameDisplay.firstChild)
        }
        GameBoard.getGameBoardSpots()[event.target.dataset.index] = mark
    }

   

    return{setPlayerMark, playerMark}

}




const Game = (()=>{
    const notification = document.querySelector("#notify")
    const winnerMark = notification.querySelector("h1")
    const restart = document.querySelector("#notify ~ button")

    const announceWinner = (won)=>{
        if(!won){
            notification.className = "hide"
        }else{
            winnerMark.textContent  = won
            notification.className = "show"
        }
    }
    const clickEvents = (event)=>{

        notification.addEventListener("click", (event)=>{
            if(event.target.nodeName == "BUTTON"){
                replay()
                notification.className = "hide"
            } else {
                notification.className = "hide"
                restart.textContent = "Play Again"
            }
        })
        
        restart.addEventListener("click", (event)=>{
            event.target.textContent = "Restart"
            replay()
        })
    }
    function replay(){
        while(GameBoard.gameDisplay.firstChild){
            GameBoard.gameDisplay.removeChild(GameBoard.gameDisplay.firstChild)
        }
        GameBoard.setGameBoardSpots("")
        GameBoard.setWinner(0)
        GameBoard.renderContents()
        GameBoard.resetMarkedSpots()
        GameBoard.setCount(1)
    }


    announceWinner(GameBoard.getWinner())
    clickEvents()
    return {announceWinner}
})()



const firstPlayer = Player("X")
const secondPlayer = Player("O")

const Ai = (()=>{
    const ai = document.querySelector(".ai")
    let mode = 0;
    let aiSpot= null;

    const getAispot=()=> aiSpot
    const setAiSpot=()=> {
        aiSpot = ~~(Math.random()*9)
        const emptySpots = GameBoard.getGameBoardSpots().filter((spot, index)=> index)
       return emptySpots
    }
    const getMode =()=> mode
    const setAimode = ()=> mode = "ai"

    const clickEvent= ()=>{
        ai.addEventListener("click", ()=>{
            setAimode()
    })} 

    const setAIMark=(event)=>{
        
        GameBoard.position(event)
        GameBoard.checkWinner()
        if(GameBoard.checkWinner()){
            return;
        }else{
            while(GameBoard.gameDisplay.firstChild){
                GameBoard.gameDisplay.removeChild(GameBoard.gameDisplay.firstChild)
            }
            for(let i=0; i < 9; i++){
                setAiSpot()
                if(GameBoard.getGameBoardSpots()[getAispot()]){
                    setAiSpot()
                } else if(!GameBoard.getGameBoardSpots()[getAispot()]){
                    GameBoard.getGameBoardSpots()[getAispot()] = "O"
                    break;
                }
            }
        }
    }

    clickEvent()
    return{setAIMark, getMode, getAispot}
})()


