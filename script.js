const GameBoard = (()=>{
    const gameDisplay = document.querySelector(".game-board")
    let gameBoard = ["", "", "", "", "", "", "", "", ""]
    let newArr = []
    let count = 1;
    let marked = {X: [], O: []}
    let winner = 0
    let callAgain = 0;

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
    
    const position=(event)=>{
        if(!callAgain){
            if(Ai.getMode()){
                marked.X.push(event.target.dataset.index)
                Ai.setAiSpot()
                marked.O.push(Ai.getAiSpot())
            }else if(!Ai.getMode() && (count % 2 !== 0)){
                marked.X.push(event.target.dataset.index)
            }else if(!Ai.getMode() && (count % 2 === 0)){
                marked.O.push(event.target.dataset.index)
            }
        } else if(callAgain){
            callAgain = 0;
            return
        }
        
    }
    const getMarkedSpots=()=> marked
    const resetMarkedSpots=()=> {
        for(prop in marked){
            marked[prop] = []
        }
    }
    const getGameBoardSpots =()=> gameBoard
    const setWinner=(num)=> winner = num
    const getWinner=()=> winner
    const setCount=(num)=> count = num
    const setGameBoardSpots = (spot)=>{
        for(let i=0; i < gameBoard.length; i++){gameBoard[i] = spot}
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
    function getPlayerMark(event){
        position(event)
        checkWinner()
        callAgain = 1;
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


    renderContents()
    clickEvent()
    return  {
                getGameBoardSpots, setGameBoardSpots, gameDisplay,setCount, getMarkedSpots,
                renderContents, setWinner,getWinner,resetMarkedSpots, position, checkWinner, marked,
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
const firstPlayer = Player("X")
const secondPlayer = Player("O")

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


const Ai = (()=>{
    const ai = document.querySelector(".ai")
    let mode = 0;
    let AiSpot = ""
    const setAiSpot=()=> {
        const allPossibleSpots=[0,1,2,3,4,5,6,7,8]
        for(let marks in GameBoard.getMarkedSpots()){
            for(let spot of GameBoard.getMarkedSpots()[marks]){
                for(let i=0; i < allPossibleSpots.length; i++){
                    if(allPossibleSpots[i] == +spot){
                        allPossibleSpots.splice(i , 1)
                    }else {
                        continue;
                    }
                }
            }
        }
        AiSpot = allPossibleSpots[~~(Math.random() * allPossibleSpots.length)]
    }
    const getAiSpot=()=> AiSpot
    const getMode =()=> mode
    const setAimode = ()=> mode = "ai"

    const clickEvent= ()=>{
        ai.addEventListener("click", ()=>{
            setAimode()
    })} 

    const setAIMark=(event)=>{
        if(GameBoard.checkWinner()){
            return
        }else{
            while(GameBoard.gameDisplay.firstChild){
                GameBoard.gameDisplay.removeChild(GameBoard.gameDisplay.firstChild)
            }
            GameBoard.getGameBoardSpots()[getAiSpot()] = "O"
        }
    }

    clickEvent()
    return{setAIMark, getMode, setAiSpot, getAiSpot}
})()


